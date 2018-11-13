import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PoiService } from '../poi.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-poi-edit',
  templateUrl: './poi-edit.component.html',
  styleUrls: ['./poi-edit.component.css']
})
export class PoiEditComponent implements OnInit, OnDestroy {
  poiTypes = ['RESTAURANT', 'LEGEND', 'SIGHT'];
  langs = ['DE', 'EN', 'PL'];

  videoForm = this.fb.group({
    arScene: [''],
    iconScene: ['']
  });

  iconForm = this.fb.group({
    default: null,
    explored: null
  });

  imgForm = this.fb.group({
    preview: null
  });

  vuforiaArray = this.fb.array([]);

  poiForm = this.fb.group({
    name: ['', Validators.required],
    beaconId: ['', Validators.required],
    type: ['LEGEND', Validators.required],
    coordinates: this.fb.group({
      lat: ['', Validators.required],
      long: ['', Validators.required]
    }),
    media: this.fb.group({
      icons: this.iconForm,
      image: this.imgForm,
      video: this.videoForm,
      vuforiaTargets: this.vuforiaArray
    })
  });

  editMode = false;
  poi = null;
  type = null;
  id = null;

  paramSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private poiService: PoiService
  ) {}

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('type');
    this.type = this.route.snapshot.paramMap.get('type');

    if (this.id && this.type) {
      this.editMode = true;
      this.poiService.getPOI(this.id, this.type).pipe(take(1)).subscribe((poi) => {
        this.poi = poi;
      });
    }

    this.paramSub = this.route.paramMap.subscribe(params => {
      if (params.has('id') && params.has('type')) {
        this.editMode = true;
        this.id = params.get('id');
        this.type = params.get('type');
      }
    });

  }

  isLegend() {
    return this.poiForm.controls.type.value === "LEGEND";
  }

  onSubmit() {
    console.log(this.poiForm);
  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();
  }
}
