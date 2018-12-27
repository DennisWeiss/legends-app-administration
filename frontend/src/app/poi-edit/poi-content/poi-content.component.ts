import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, OnDestroy } from "@angular/core";
import { FormGroup, FormArray } from "@angular/forms";
import { ContentFormService } from "./content-form.service";
import { ActivatedRoute, Router } from "@angular/router";
import { PoiService } from "src/app/shared/services/poi.service";
import { take } from "rxjs/operators";
import { Subscription, Observable } from "rxjs";
import { POI } from "../poi.model";
import { CanComponentDeactivate } from "src/app/shared/guards/can-deactivate.guard";
import { isEqual } from "lodash";
import { HostListener } from '@angular/core';
import SnackbarService from "src/app/shared/services/snackbar.service";

@Component({
  selector: "app-poi-content",
  templateUrl: "./poi-content.component.html",
  styleUrls: ["./poi-content.component.css"],
  providers: [ContentFormService],
  encapsulation: ViewEncapsulation.None
})
export class PoiContentComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  name = "poi-content";

  private _poi;

  initContent;

  parentSubmit = false;

  // flag for canDeativate-method to leave site without warning
  readyToDeactivate = false;

  @Input() type: string;
  @Input() poiForm: FormGroup;
  @Input() editMode: boolean;
  @Input() parentStatus: Observable<any>;
  @Input() newPoiFetched: Observable<POI>

  get poi() {
    return this._poi;
  }

  get hasParent() {
    return this.poiForm;
  }

  // called after contentForm was initialized
  @Output() contentFormCreated: EventEmitter<FormGroup> = new EventEmitter();

  // called after contentForm received values and updated.
  @Output() contentFormFilled: EventEmitter<any> = new EventEmitter();

  contents;
  contentForm: FormGroup;

  id: string;


  // subscriptions
  paramSub: Subscription;

  subs: Subscription[] = [];

  constructor(
    private contentFormService: ContentFormService,
    private route: ActivatedRoute,
    private router: Router,
    private poiService: PoiService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {

    let sub: Subscription;

    this.contentForm = this.contentFormService.contentForm;

    if (this.type) {
      // type received from parent-component
      this.contentFormService.initContentForm(this.type);
    } else {
      this.contentFormService.initContentForm("legends");
    }

    if (!this.poiForm) {
      // no poiForm was passed to this component -> get content
      this.id = this.route.snapshot.paramMap.get("id");
      this.type = this.route.snapshot.queryParamMap.get("type");

      if (this.id && this.type) {
        // initialize form based on type
        this.contentFormService.initContentForm(this.type);

        // get content from poi
        this.poiService
          .getContents(this.id)
          .pipe(take(1))
          .subscribe(contents => {
            this.contents = contents;
            this.contentFormService.update(contents, this.type);
            this.initContent = this.contentForm.value;
          });
      }

      this.paramSub = this.route.paramMap.subscribe(params => {
        if (params.has("id") && params.has("type")) {
          this.id = params.get("id");
          this.type = params.get("type");
        }
      });
    } else {

      // parent exists -> prevent child to get a warning when leaving site
      this.readyToDeactivate = true;

      // pass over form to parent-component
      this.contentFormCreated.emit(this.contentFormService.contentForm);

      if (!this.editMode) {

        // change structure of content based on current type
        sub = this.poiForm.controls.type.valueChanges.subscribe(val => {
          this.contentFormService.reset();
          this.contentFormService.initContentForm(val);
        });
        this.subs.push(sub);
      }

      sub = this.newPoiFetched.subscribe(poi => {
        this._poi = poi;
        this.contentFormService.update(this._poi.media.content, this._poi.type);
        this.contentFormFilled.emit(true);
      })
      this.subs.push(sub);


      sub = this.parentStatus.subscribe(val => {
        switch (val) {
          case 'reset':
            this.contentFormService.reset();
            if (this.editMode) {
              this.contentFormService.update(this.poi.media.content, this.type);
            }
            break;
        }
      });
      this.subs.push(sub);
    }
  }

  createHint(lang) {
    this.contentFormService.addHint(this.hints(lang));
  }

  removeHint(hints: FormArray, index) {
    this.contentFormService.removeHint(hints, index);
  }

  addLang(lang) {
    if (lang !== "") {
      this.contentFormService.addLang(lang, this.type);
    }
  }

  content(lang) {
    return (this.contentForm.get(lang) as FormGroup).controls;
  }

  hints(lang) {
    return (this.contentForm.get(lang).get("puzzle") as FormGroup).controls
      .hints as FormArray;
  }

  get langs() {
    return Object.keys(this.contentForm.controls) as Array<string>;
  }

  resetForms() {
    this.contentFormService.reset();
    this.contentFormService.update(this.contents, this.type);
  }

  onSubmit() {
    this.readyToDeactivate = true;
    const contentVal = this.contentForm.value;
    this.poiService
      .putContents(contentVal, this.id)
      .pipe(take(1))
      .subscribe(result => {
        this.router
          .navigate([""])
          .then(() => this.snackbarService.openSnackBar(result.message, "OK"));
      });
  }


  ngOnDestroy() {

    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }

    this.subs.forEach(sub => sub.unsubscribe);
  }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    // check if initial poi-object and poiForm-value are the same

    const formValue = this.contentForm.value;
    if (isEqual(formValue, this.initContent) || this.readyToDeactivate) {
      return true;
    }

    // form is dirty
    return window.confirm(
      "There are unsaved changes! You really want to leave?"
    );
  }
}
