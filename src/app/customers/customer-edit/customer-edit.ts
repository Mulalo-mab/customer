import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-edit',
  standalone: false,
  templateUrl: './customer-edit.html',
  styleUrl: './customer-edit.css'
})
export class CustomerEdit implements OnInit {

  customerForm: FormGroup;
  customerId: string = '';

  // GPS format tracking
  gpsFormat: string = 'DD';

  // Loading states
  isLoading = false;
  isSubmitting = false;

  // Use the same data structure as customer-index
  customerData: any = null;

  // Mock data that matches customer-index structure
  mockCustomers = [
    {
      ID: '2261',
      CompanyCode: 'GH001',
      CompanyName: 'GreenHill Laboratories',
      PO: 'No',
      AccountType: 'IA',
      Suburb: 'Hilton',
      AssignedTo: 'Shafieka Moosa',
      CreatedBy: 'Shafieka Moosa',
      LastComment: 'Hi Shafieka I am so so sorry to do this to you again!',
      NextStep: 'None',
      NextStepOther: '',
      Archive: '',
      // Additional fields for the form
      registeredCompanyName: 'GreenHill Laboratories Ltd',
      prevCompanyName: 'GreenHill Pharma',
      accountNumber: 'ACC-2261',
      addressLine1: '123 Science Park',
      addressLine2: 'Building A',
      addressLine3: 'Research Wing',
      suburb: 'Hilton',
      city: 'Cape Town',
      area: 'Western Cape',
      country: 'South Africa',
      postalCode: '8001',
      telephone: '+27-21-555-0123',
      altPhone: '+27-21-555-0124',
      fax: '+27-21-555-0125',
      listing: ['healthcare'],
      industryType: ['healthcare'],
      serviceType: ['consulting'],
      finAddressLine1: '456 Finance Street',
      finAddressLine2: 'Floor 3',
      finAddressLine3: 'Accounting Dept',
      finSuburb: 'Financial District',
      finCity: 'Cape Town',
      finPostalCode: '8001',
      finRegion: 'Western Cape',
      finCountry: 'South Africa',
      finTelephone: '+27-21-555-0126',
      finFax: '+27-21-555-0127',
      vat: 'ZA123456789',
      website: 'https://www.greenhill-labs.com',
      assignedTo: 'shafieka_moosa',
      product: ['product_a'],
      zone: 'south',
      posAddress1: 'PO Box 123',
      posAddress2: 'Mail Center',
      posAddress3: '',
      posSuburb: 'Hilton',
      posCity: 'Cape Town',
      posZipCode: '8001',
      posRegion: 'Western Cape',
      posCountry: 'South Africa',
      poRequired: 'yes',
      accountType: 'standard',
      region: 'region_1',
      gps: '-33.9249,18.4241',
      remark: 'Medical laboratory services provider',
      flag: 'ACTIVE'
    },
    {
      ID: '2258',
      CompanyCode: 'SGS001',
      CompanyName: 'SGS Somerset',
      PO: 'No',
      AccountType: 'IA',
      Suburb: 'Somerset West',
      AssignedTo: 'Shafieka Moosa',
      CreatedBy: 'Shafieka Moosa',
      LastComment: 'Hi Shafieka I am so so sorry to do this to you again!',
      NextStep: 'None',
      NextStepOther: '',
      Archive: '',
      // Additional fields
      registeredCompanyName: 'SGS Somerset Pty Ltd',
      prevCompanyName: '',
      accountNumber: 'ACC-2258',
      addressLine1: '789 Industrial Avenue',
      addressLine2: '',
      addressLine3: '',
      suburb: 'Somerset West',
      city: 'Cape Town',
      area: 'Western Cape',
      country: 'South Africa',
      postalCode: '7130',
      telephone: '+27-21-555-0133',
      altPhone: '',
      fax: '',
      listing: ['corporate'],
      industryType: ['manufacturing'],
      serviceType: ['support'],
      finAddressLine1: '789 Finance Road',
      finAddressLine2: '',
      finAddressLine3: '',
      finSuburb: 'Somerset West',
      finCity: 'Cape Town',
      finPostalCode: '7130',
      finRegion: 'Western Cape',
      finCountry: 'South Africa',
      finTelephone: '+27-21-555-0134',
      finFax: '',
      vat: 'ZA987654321',
      website: 'https://www.sgs-somerset.com',
      assignedTo: 'shafieka_moosa',
      product: ['product_b'],
      zone: 'south',
      posAddress1: 'PO Box 456',
      posAddress2: '',
      posAddress3: '',
      posSuburb: 'Somerset West',
      posCity: 'Cape Town',
      posZipCode: '7130',
      posRegion: 'Western Cape',
      posCountry: 'South Africa',
      poRequired: 'no',
      accountType: 'premium',
      region: 'region_2',
      gps: '-34.0834,18.8484',
      remark: 'Quality control and testing services',
      flag: 'ACTIVE'
    },
    {
      ID: '2256',
      CompanyCode: 'IN2001',
      CompanyName: 'in2food Strand',
      PO: 'No',
      AccountType: 'IA',
      Suburb: 'Strand',
      AssignedTo: 'Shafieka Moosa',
      CreatedBy: 'Shafieka Moosa',
      LastComment: 'Hi Shafieka I am so so sorry to do this to you again!',
      NextStep: 'None',
      NextStepOther: '',
      Archive: '',
      // Additional fields
      registeredCompanyName: 'in2food Strand Ltd',
      prevCompanyName: 'Strand Foods',
      accountNumber: 'ACC-2256',
      addressLine1: '456 Food Processing Street',
      addressLine2: 'Factory Floor',
      addressLine3: '',
      suburb: 'Strand',
      city: 'Cape Town',
      area: 'Western Cape',
      country: 'South Africa',
      postalCode: '7140',
      telephone: '+27-21-555-0143',
      altPhone: '+27-21-555-0144',
      fax: '+27-21-555-0145',
      listing: ['enterprise'],
      industryType: ['manufacturing'],
      serviceType: ['implementation'],
      finAddressLine1: '456 Finance Avenue',
      finAddressLine2: '',
      finAddressLine3: '',
      finSuburb: 'Strand',
      finCity: 'Cape Town',
      finPostalCode: '7140',
      finRegion: 'Western Cape',
      finCountry: 'South Africa',
      finTelephone: '+27-21-555-0146',
      finFax: '',
      vat: 'ZA456123789',
      website: 'https://www.in2food-strand.com',
      assignedTo: 'shafieka_moosa',
      product: ['product_c'],
      zone: 'south',
      posAddress1: 'PO Box 789',
      posAddress2: '',
      posAddress3: '',
      posSuburb: 'Strand',
      posCity: 'Cape Town',
      posZipCode: '7140',
      posRegion: 'Western Cape',
      posCountry: 'South Africa',
      poRequired: 'sometimes',
      accountType: 'enterprise',
      region: 'region_3',
      gps: '-34.1167,18.8278',
      remark: 'Food processing and packaging company',
      flag: 'ACTIVE'
    },
    {
      ID: '2253',
      CompanyCode: 'SCI001',
      CompanyName: 'Scientific Services',
      PO: 'No',
      AccountType: 'IA',
      Suburb: 'Ndabeni',
      AssignedTo: 'Shafieka Moosa',
      CreatedBy: 'Shafieka Moosa',
      LastComment: 'Hi Shafieka I am so so sorry to do this to you again!',
      NextStep: 'None',
      NextStepOther: '',
      Archive: '',
      // Additional fields
      registeredCompanyName: 'Scientific Services (Pty) Ltd',
      prevCompanyName: 'Science Corp',
      accountNumber: 'ACC-2253',
      addressLine1: '321 Research Road',
      addressLine2: 'Laboratory Complex',
      addressLine3: 'Unit 5',
      suburb: 'Ndabeni',
      city: 'Cape Town',
      area: 'Western Cape',
      country: 'South Africa',
      postalCode: '7405',
      telephone: '+27-21-555-0153',
      altPhone: '+27-21-555-0154',
      fax: '+27-21-555-0155',
      listing: ['corporate', 'enterprise'],
      industryType: ['technology', 'healthcare'],
      serviceType: ['consulting', 'training'],
      finAddressLine1: '321 Finance Boulevard',
      finAddressLine2: 'Suite 200',
      finAddressLine3: '',
      finSuburb: 'Ndabeni',
      finCity: 'Cape Town',
      finPostalCode: '7405',
      finRegion: 'Western Cape',
      finCountry: 'South Africa',
      finTelephone: '+27-21-555-0156',
      finFax: '+27-21-555-0157',
      vat: 'ZA789456123',
      website: 'https://www.scientific-services.com',
      assignedTo: 'shafieka_moosa',
      product: ['product_a', 'product_d'],
      zone: 'central',
      posAddress1: 'PO Box 321',
      posAddress2: '',
      posAddress3: '',
      posSuburb: 'Ndabeni',
      posCity: 'Cape Town',
      posZipCode: '7405',
      posRegion: 'Western Cape',
      posCountry: 'South Africa',
      poRequired: 'yes',
      accountType: 'vip',
      region: 'region_4',
      gps: '-33.9236,18.5132',
      remark: 'Scientific research and development services',
      flag: 'VIP_CUSTOMER'
    }
  ];

  // Dummy data for dropdowns
  listings: any[] = [
    { value: 'corporate', text: 'Corporate' },
    { value: 'small_business', text: 'Small Business' },
    { value: 'enterprise', text: 'Enterprise' },
    { value: 'startup', text: 'Startup' },
    { value: 'non_profit', text: 'Non-Profit' }
  ];

  industryTypes: any[] = [
    { value: 'technology', text: 'Technology' },
    { value: 'healthcare', text: 'Healthcare' },
    { value: 'finance', text: 'Finance' },
    { value: 'manufacturing', text: 'Manufacturing' },
    { value: 'retail', text: 'Retail' },
    { value: 'education', text: 'Education' },
    { value: 'hospitality', text: 'Hospitality' }
  ];

  serviceTypes: any[] = [
    { value: 'consulting', text: 'Consulting' },
    { value: 'support', text: 'Support' },
    { value: 'training', text: 'Training' },
    { value: 'implementation', text: 'Implementation' },
    { value: 'maintenance', text: 'Maintenance' },
    { value: 'custom_development', text: 'Custom Development' }
  ];

  assignedToUsers: any[] = [
    { value: 'shafieka_moosa', text: 'Shafieka Moosa' },
    { value: 'john_doe', text: 'John Doe' },
    { value: 'jane_smith', text: 'Jane Smith' },
    { value: 'mike_wilson', text: 'Mike Wilson' },
    { value: 'sarah_jones', text: 'Sarah Jones' },
    { value: 'david_brown', text: 'David Brown' }
  ];

  products: any[] = [
    { value: 'product_a', text: 'Product A' },
    { value: 'product_b', text: 'Product B' },
    { value: 'product_c', text: 'Product C' },
    { value: 'product_d', text: 'Product D' },
    { value: 'product_e', text: 'Product E' }
  ];

  zones: any[] = [
    { value: 'north', text: 'North Zone' },
    { value: 'south', text: 'South Zone' },
    { value: 'east', text: 'East Zone' },
    { value: 'west', text: 'West Zone' },
    { value: 'central', text: 'Central Zone' }
  ];

  poRequiredOptions: any[] = [
    { value: 'yes', text: 'Yes' },
    { value: 'no', text: 'No' },
    { value: 'sometimes', text: 'Sometimes' }
  ];

  accountTypes: any[] = [
    { value: 'standard', text: 'Standard' },
    { value: 'premium', text: 'Premium' },
    { value: 'enterprise', text: 'Enterprise' },
    { value: 'vip', text: 'VIP' }
  ];

  regions: any[] = [
    { value: 'region_1', text: 'Region 1' },
    { value: 'region_2', text: 'Region 2' },
    { value: 'region_3', text: 'Region 3' },
    { value: 'region_4', text: 'Region 4' },
    { value: 'region_5', text: 'Region 5' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.customerForm = this.createForm();
  }

  ngOnInit(): void {
    // Get customer ID from route parameters
    this.customerId = this.route.snapshot.paramMap.get('id') || '';
    console.log('Editing customer ID:', this.customerId);

    this.loadCustomerData();
  }

  private loadCustomerData(): void {
    this.isLoading = true;

    // Simulate API call to get customer data
    setTimeout(() => {
      this.customerData = this.getCustomerById(this.customerId);

      if (this.customerData) {
        // Map the customer data to form fields
        this.mapCustomerDataToForm(this.customerData);
        this.parseGPSData(this.customerData.gps);
        console.log('Customer data loaded:', this.customerData);
      } else {
        console.error('Customer not found for ID:', this.customerId);
        alert('Customer not found!');
        this.router.navigate(['/customers']);
      }

      this.isLoading = false;
    }, 1000);
  }

  private getCustomerById(id: string): any {
    return this.mockCustomers.find(customer => customer.ID === id) || null;
  }

  private mapCustomerDataToForm(customerData: any): void {
    // Map the customer data to form field names
    const formData = {
      // Company Information
      companyCode: customerData.CompanyCode,
      companyName: customerData.CompanyName,
      registeredCompanyName: customerData.registeredCompanyName,
      prevCompanyName: customerData.prevCompanyName,
      accountNumber: customerData.accountNumber,

      // Physical Address
      addressLine1: customerData.addressLine1,
      addressLine2: customerData.addressLine2,
      addressLine3: customerData.addressLine3,
      suburb: customerData.suburb,
      city: customerData.city,
      area: customerData.area,
      country: customerData.country,
      postalCode: customerData.postalCode,

      // Contact Information
      telephone: customerData.telephone,
      altPhone: customerData.altPhone,
      fax: customerData.fax,

      // Dropdown Selections
      listing: customerData.listing || [],
      industryType: customerData.industryType || [],
      serviceType: customerData.serviceType || [],

      // Financial Address
      finAddressLine1: customerData.finAddressLine1,
      finAddressLine2: customerData.finAddressLine2,
      finAddressLine3: customerData.finAddressLine3,
      finSuburb: customerData.finSuburb,
      finCity: customerData.finCity,
      finPostalCode: customerData.finPostalCode,
      finRegion: customerData.finRegion,
      finCountry: customerData.finCountry,
      finTelephone: customerData.finTelephone,
      finFax: customerData.finFax,
      vat: customerData.vat,
      website: customerData.website,

      // Assigned Fields
      assignedTo: customerData.assignedTo,
      product: customerData.product || [],
      zone: customerData.zone,

      // Postal Address
      posAddress1: customerData.posAddress1,
      posAddress2: customerData.posAddress2,
      posAddress3: customerData.posAddress3,
      posSuburb: customerData.posSuburb,
      posCity: customerData.posCity,
      posZipCode: customerData.posZipCode,
      posRegion: customerData.posRegion,
      posCountry: customerData.posCountry,

      // PO Required Section
      poRequired: customerData.poRequired,
      accountType: customerData.accountType,
      region: customerData.region,

      // Additional Information
      remark: customerData.remark,
      flag: customerData.flag
    };

    this.customerForm.patchValue(formData);
  }

  private parseGPSData(gpsValue: string): void {
    if (!gpsValue) {
      this.gpsFormat = 'DD';
      return;
    }

    // Simple parsing for DD format (latitude,longitude)
    if (gpsValue.includes(',')) {
      const [lat, long] = gpsValue.split(',');
      this.gpsFormat = 'DD';
      this.customerForm.patchValue({
        ddLatitude: lat.trim(),
        ddLongitude: long.trim()
      });
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      // Company Information
      companyCode: [''],
      companyName: ['', [Validators.required, Validators.minLength(2)]],
      registeredCompanyName: [''],
      prevCompanyName: [''],
      accountNumber: [''],

      // Physical Address
      addressLine1: [''],
      addressLine2: [''],
      addressLine3: [''],
      suburb: [''],
      city: [''],
      area: [''],
      country: [''],
      postalCode: [''],

      // Contact Information
      telephone: [''],
      altPhone: [''],
      fax: [''],

      // Dropdown Selections
      listing: [[]],
      industryType: [[]],
      serviceType: [[]],

      // Financial Address
      finAddressLine1: [''],
      finAddressLine2: [''],
      finAddressLine3: [''],
      finSuburb: [''],
      finCity: [''],
      finPostalCode: [''],
      finRegion: [''],
      finCountry: [''],
      finTelephone: [''],
      finFax: [''],
      vat: [''],
      website: [''],

      // Assigned Fields
      assignedTo: [''],
      product: [[]],
      zone: [''],

      // Postal Address
      posAddress1: [''],
      posAddress2: [''],
      posAddress3: [''],
      posSuburb: [''],
      posCity: [''],
      posZipCode: [''],
      posRegion: [''],
      posCountry: [''],

      // PO Required Section
      poRequired: [''],
      accountType: [''],
      region: [''],

      // GPS Coordinates
      gps: [''],

      // DD Format
      ddLatitude: [''],
      ddLongitude: [''],

      // DM Format
      dmNorthSouth: ['N'],
      dmLatitudeDegrees: [''],
      dmLatitudeMinutes: [''],
      dmEastWest: ['E'],
      dmLongitudeDegrees: [''],
      dmLongitudeMinutes: [''],

      // DMS Format
      dmsNorthSouth: ['N'],
      dmsLatitudeDegrees: [''],
      dmsLatitudeMinutes: [''],
      dmsLatitudeSeconds: [''],
      dmsEastWest: ['E'],
      dmsLongitudeDegrees: [''],
      dmsLongitudeMinutes: [''],
      dmsLongitudeSeconds: [''],

      // Additional Information
      remark: [''],
      flag: [''],

      // File Upload
      files: this.fb.array([])
    });
  }

  // Get files from array
  get files(): FormArray {
    return this.customerForm.get('files') as FormArray;
  }

  // Handle file selection
  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        this.files.push(this.fb.control(files[i]));
      }
      console.log('Files selected:', files.length);
    }
  }

  // Removes a file from the form array
  removeFile(index: number): void {
    this.files.removeAt(index);
    console.log('File removed at index:', index);
  }

  // Handles GPS format changes
  onGpsFormatChange(format: string): void {
    this.gpsFormat = format;
    console.log('GPS format changed to:', format);

    // Clear other format fields when switching
    if (format === 'DD') {
      this.clearGpsFields(['DM', 'DMS']);
    } else if (format === 'DM') {
      this.clearGpsFields(['DD', 'DMS']);
    } else if (format === 'DMS') {
      this.clearGpsFields(['DD', 'DM']);
    }
  }

  // Clears GPS field for formats not in use
  private clearGpsFields(formatsToClear: string[]): void {
    formatsToClear.forEach(format => {
      if (format === 'DD') {
        this.customerForm.patchValue({
          ddLatitude: '',
          ddLongitude: ''
        });
      } else if (format === 'DM') {
        this.customerForm.patchValue({
          dmLatitudeDegrees: '',
          dmLatitudeMinutes: '',
          dmLongitudeDegrees: '',
          dmLongitudeMinutes: ''
        });
      } else if (format === 'DMS') {
        this.customerForm.patchValue({
          dmsLatitudeDegrees: '',
          dmsLatitudeMinutes: '',
          dmsLatitudeSeconds: '',
          dmsLongitudeDegrees: '',
          dmsLongitudeMinutes: '',
          dmsLongitudeSeconds: ''
        });
      }
    });
  }

  // Validates GPS coordinates based on format
  validateCoordinates(): void {
    console.log('Validating GPS coordinates in format:', this.gpsFormat);

    switch (this.gpsFormat) {
      case 'DD':
        this.validateDDCoordinates();
        break;
      case 'DM':
        this.validateDMCoordinates();
        break;
      case 'DMS':
        this.validateDMSCoordinates();
        break;
    }
  }

  // Validates decimal degrees format
  private validateDDCoordinates(): void {
    const lat = this.customerForm.get('ddLatitude')?.value;
    const long = this.customerForm.get('ddLongitude')?.value;

    if (lat && long) {
      const latNum = parseFloat(lat);
      const longNum = parseFloat(long);

      if (isNaN(latNum) || latNum < -90 || latNum > 90) {
        console.error('Invalid latitude. Must be between -90 and 90.');
        alert('Invalid latitude. Must be between -90 and 90.');
      } else if (isNaN(longNum) || longNum < -180 || longNum > 180) {
        console.error('Invalid longitude. Must be between -180 and 180.');
        alert('Invalid longitude. Must be between -180 and 180.');
      } else {
        console.log('DD coordinates are valid');
      }
    }
  }

  // Validates degrees minutes format
  private validateDMCoordinates(): void {
    const latDeg = this.customerForm.get('dmLatitudeDegrees')?.value;
    const latMin = this.customerForm.get('dmLatitudeMinutes')?.value;
    const longDeg = this.customerForm.get('dmLongitudeDegrees')?.value;
    const longMin = this.customerForm.get('dmLongitudeMinutes')?.value;

    let isValid = true;

    if (latDeg && latMin) {
      const latDegNum = parseInt(latDeg);
      const latMinNum = parseFloat(latMin);

      if (isNaN(latDegNum) || latDegNum < 0 || latDegNum > 90) {
        console.error('Invalid latitude degrees. Must be between 0 and 90.');
        alert('Invalid latitude degrees. Must be between 0 and 90.');
        isValid = false;
      }

      if (isNaN(latMinNum) || latMinNum < 0 || latMinNum >= 60) {
        console.error('Invalid latitude minutes. Must be between 0 and 60.');
        alert('Invalid latitude minutes. Must be between 0 and 60.');
        isValid = false;
      }
    }

    if (longDeg && longMin) {
      const longDegNum = parseInt(longDeg);
      const longMinNum = parseFloat(longMin);

      if (isNaN(longDegNum) || longDegNum < 0 || longDegNum > 180) {
        console.error('Invalid longitude degrees. Must be between 0 and 180.');
        alert('Invalid longitude degrees. Must be between 0 and 180.');
        isValid = false;
      }

      if (isNaN(longMinNum) || longMinNum < 0 || longMinNum >= 60) {
        console.error('Invalid longitude minutes. Must be between 0 and 60.');
        alert('Invalid longitude minutes. Must be between 0 and 60.');
        isValid = false;
      }
    }

    if (isValid) {
      console.log('DM coordinates are valid');
    }
  }

  // Validates Degrees Minutes Seconds Format
  private validateDMSCoordinates(): void {
    const latDeg = this.customerForm.get('dmsLatitudeDegrees')?.value;
    const latMin = this.customerForm.get('dmsLatitudeMinutes')?.value;
    const latSec = this.customerForm.get('dmsLatitudeSeconds')?.value;
    const longDeg = this.customerForm.get('dmsLongitudeDegrees')?.value;
    const longMin = this.customerForm.get('dmsLongitudeMinutes')?.value;
    const longSec = this.customerForm.get('dmsLongitudeSeconds')?.value;

    console.log('DMS coordinates validation would go here');
    // Similar validation logic as DM but including seconds
  }

  // Handles form Submission
  onSubmit(): void {
    console.log('Form submission started');

    if (this.customerForm.valid) {
      this.isSubmitting = true;

      // Prepare GPS data before submission
      this.prepareGPSData();

      // Log form data for testing
      console.log('Form Data:', this.customerForm.value);
      console.log('Form is valid, submitting...');

      // Simulate API call delay
      setTimeout(() => {
        // Show success message
        alert('Customer updated successfully! (This is a demo - no actual API call was made)');

        // Log what would be sent to API
        const formData = this.prepareFormData();
        console.log('FormData that would be sent to API:', formData);

        this.isSubmitting = false;

        console.log('Customer updated successfully');

      }, 1000);

    } else {
      console.log('Form is invalid');

      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched(this.customerForm);

      // Show which fields are invalid
      this.logInvalidFields();

      alert('Please fill in all required fields correctly.');
    }
  }

  // Prepares GPS data based on selected format
  private prepareGPSData(): void {
    let gpsValue = '';

    switch (this.gpsFormat) {
      case 'DD':
        const lat = this.customerForm.get('ddLatitude')?.value;
        const long = this.customerForm.get('ddLongitude')?.value;
        if (lat && long) {
          gpsValue = `${lat},${long}`;
        }
        break;

      case 'DM':
        const ns = this.customerForm.get('dmNorthSouth')?.value;
        const latDeg = this.customerForm.get('dmLatitudeDegrees')?.value;
        const latMin = this.customerForm.get('dmLatitudeMinutes')?.value;
        const ew = this.customerForm.get('dmEastWest')?.value;
        const longDeg = this.customerForm.get('dmLongitudeDegrees')?.value;
        const longMin = this.customerForm.get('dmLongitudeMinutes')?.value;

        if (latDeg && latMin && longDeg && longMin) {
          gpsValue = `${ns} ${latDeg}° ${latMin}', ${ew} ${longDeg}° ${longMin}'`;
        }
        break;

      case 'DMS':
        const dmsNs = this.customerForm.get('dmsNorthSouth')?.value;
        const dmsLatDeg = this.customerForm.get('dmsLatitudeDegrees')?.value;
        const dmsLatMin = this.customerForm.get('dmsLatitudeMinutes')?.value;
        const dmsLatSec = this.customerForm.get('dmsLatitudeSeconds')?.value;
        const dmsEw = this.customerForm.get('dmsEastWest')?.value;
        const dmsLongDeg = this.customerForm.get('dmsLongitudeDegrees')?.value;
        const dmsLongMin = this.customerForm.get('dmsLongitudeMinutes')?.value;
        const dmsLongSec = this.customerForm.get('dmsLongitudeSeconds')?.value;

        if (dmsLatDeg && dmsLatMin && dmsLatSec && dmsLongDeg && dmsLongMin && dmsLongSec) {
          gpsValue = `${dmsNs} ${dmsLatDeg}° ${dmsLatMin}' ${dmsLatSec}", ${dmsEw} ${dmsLongDeg}° ${dmsLongMin}' ${dmsLongSec}"`;
        }
        break;
    }

    this.customerForm.patchValue({ gps: gpsValue });
    console.log('GPS value prepared:', gpsValue);
  }

  // Prepares FormData for file upload (simulated)
  private prepareFormData(): FormData {
    const formData = new FormData();
    const formValue = this.customerForm.value;

    // Append all form fields except files
    Object.keys(formValue).forEach(key => {
      if (key !== 'files') {
        const value = formValue[key];
        if (Array.isArray(value)) {
          value.forEach(item => formData.append(key, item));
        } else if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      }
    });

    // Append Files
    this.files.controls.forEach((fileControl, index) => {
      formData.append('files', fileControl.value);
    });

    return formData;
  }

  // Marks all form controls as touched to trigger validation messages
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach(arrayControl => {
          if (arrayControl instanceof FormGroup) {
            this.markFormGroupTouched(arrayControl);
          } else {
            arrayControl.markAsTouched();
          }
        });
      } else {
        control?.markAsTouched();
      }
    });
  }

  // Logs invalid field for debugging
  private logInvalidFields(): void {
    Object.keys(this.customerForm.controls).forEach(key => {
      const control = this.customerForm.get(key);
      if (control?.invalid) {
        console.log(`Invalid field: ${key}`, control.errors);
      }
    });
  }

  // Utility method to check if a field is invalid
  isFieldInvalid(fieldName: string): boolean {
    const field = this.customerForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  // Utility method to get error message for a field
  getFieldError(fieldName: string): string {
    const field = this.customerForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return 'This field is required';
      }
      if (field.errors['minlength']) {
        return `Minimum length is ${field.errors['minlength'].requiredLength} characters`;
      }
      // Add more error types as needed
    }
    return '';
  }

  // Resets the form to its initial state
  onReset(): void {
    this.loadCustomerData(); // Reload original data
    console.log('Form reset to original data');
  }

  // Go to communication
  goToCommunication(): void {
    const id = this.customerId;
    // Navigate to communication page
    console.log('Navigating to communication for customer:', id);
    // this.router.navigate(['/forum'], { queryParams: { type: 'CC', articleId: id } });
    alert(`Would navigate to communication for customer ${id}`);
  }

  // File type and size methods
  getFileType(filename: string): string {
    if (!filename) return 'Unknown';

    const extension = filename.split('.').pop()?.toLowerCase();
    const fileTypes: { [key: string]: string } = {
      'pdf': 'PDF',
      'doc': 'Word',
      'docx': 'Word',
      'xls': 'Excel',
      'xlsx': 'Excel',
      'jpg': 'Image',
      'jpeg': 'Image',
      'png': 'Image',
      'gif': 'Image',
      'txt': 'Text',
      'zip': 'Archive',
      'rar': 'Archive'
    };

    return fileTypes[extension || ''] || extension?.toUpperCase() || 'File';
  }

  formatFileSize(bytes: number): string {
    if (!bytes) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Go back to list
  goBackToList(): void {
    this.router.navigate(['/customers']);
  }
}
