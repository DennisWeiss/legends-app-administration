import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormArray, FormBuilder, FormControl } from "@angular/forms";
import { ContentFormService } from "./content-form.service";
import { ActivatedRoute, Router } from "@angular/router";
import { PoiService } from "src/app/shared/services/poi.service";
import { take } from "rxjs/operators";
import { Subscription, Observable } from "rxjs";
import { POI } from "../poi.model";
import { CanComponentDeactivate } from "src/app/shared/guards/can-deactivate.guard";
import { isEqual } from "lodash";
import { MatSnackBar } from "@angular/material";
import { HostListener } from '@angular/core';

@Component({
  selector: "app-poi-content",
  templateUrl: "./poi-content.component.html",
  styleUrls: ["./poi-content.component.css"],
  providers: [ContentFormService],
  encapsulation: ViewEncapsulation.None
})
export class PoiContentSingleComponent implements OnInit, CanComponentDeactivate {
  name = "poi-content";

  private _poi;
  initContent;

  responseSuccess = false;

  parentSubmit = false;

  type: string;
  id: string;

  contents;
  contentForm: FormGroup;

  // subscriptions
  paramSub: Subscription;

  @Input() loading: boolean

  constructor(
    private contentFormService: ContentFormService,
    private route: ActivatedRoute,
    private router: Router,
    private poiService: PoiService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.contentForm = this.contentFormService.contentForm;

    this.contentFormService.initContentForm("legends");

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
    const contentVal = this.contentForm.value;
    this.poiService
      .putContents(contentVal, this.id)
      .pipe(take(1))
      .subscribe(result => {
        this.responseSuccess = true;
        this.router
          .navigate([""])
          .then(() => this.openSnackBar(result.message, "OK"));
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000
    });
  }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    // check if initial poi-object and poiForm-value are the same

    const formValue = this.contentForm.value;
    if (isEqual(formValue, this.initContent)) {
      return true;
    }

    // form is dirty
    return window.confirm(
      "There are unsaved changes! You really want to leave?"
    );
  }
}
