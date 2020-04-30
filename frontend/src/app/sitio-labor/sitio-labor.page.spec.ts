import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitioLaborPage } from './sitio-labor.page';

describe('SitioLaborPage', () => {
  let component: SitioLaborPage;
  let fixture: ComponentFixture<SitioLaborPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitioLaborPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitioLaborPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
