
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PoiService } from '../poi.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { LocaleService } from '../locale.service';
import translate from '../translations/translate';

@Component({
  selector: 'app-poi-edit',
  templateUrl: './poi-edit.component.html',
  styleUrls: ['./poi-edit.component.css']
})
export class PoiEditComponent implements OnInit, OnDestroy {
  t;
  poiTypes = ['restaurants', 'legends', 'sights'];
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
      lng: ['', Validators.required]
    }),
    icons: this.iconForm,
    image: this.imgForm,
    video: this.videoForm,
    vuforiaTargets: this.vuforiaArray
  });


  editMode = false;
  poi = null;
  type = null;
  id = null;

  paramSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private poiService: PoiService,
    public localeService: LocaleService
  ) {}


  setT(locale: string) {
    this.t = translate('poi-edit', locale)
  }


  ngOnInit() {

    this.setT(this.localeService.getLocale())
    this.localeService.localeUpdated.subscribe(this.setT.bind(this))

    this.id = this.route.snapshot.paramMap.get('id');
    this.type = this.route.snapshot.queryParamMap.get('type');

    if (this.id && this.type) {
      this.editMode = true;
      this.poiService.getPOI(this.id).pipe(take(1)).subscribe((poi) => {
        this.poi = poi;
       // this.poiForm.setValue(poi);
        console.log('poi', this.poi);
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
    return this.poiForm.controls.type.value === 'LEGEND';
  }

  onSubmit() {
    console.log(this.poiForm);
  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();

  }
}
