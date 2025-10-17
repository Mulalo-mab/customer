import { Component, OnInit } from '@angular/core';
import { ColDef, GridReadyEvent, GridOption } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';

ModuleRegistry.registerModules([AllCommunityModule]);


@Component({
  selector: 'app-customer-index',
  standalone: false,
  templateUrl: './customer-index.html',
  styleUrl: './customer-index.css'
})




export class CustomerIndex implements OnInit {

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  // Grid configuration
  gridOptions: GridOptions = {
    rowSelection: 'multiple',
    suppressRowClickSelection: false,
    enableCellTextSelection: true,
    ensureDomOrder: true,
    getRowHeight: (params: any) => {
      if (params.data?.lastComment && params.data.lastComment.length > 100) {
        return 80;
      }
      return 40;
    }
  };

  // Grid data and configuration
  gridData: any[] = [];
  columnDefs: ColDef[] = [];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
    cellStyle: {
      'border-right': '1px solid #ddd',
      'font-size': '12px',
      'padding': '4px 8px'
    },
    headerClass: 'ag-header-custom'
  };

  // Search and filter
  searchTerm: string = '';
  selectedStatus: string = '';
  selectedAssignedTo: string = '';

  // Loading state
  isLoading: boolean = false;

  // Filter options
  statuses: any[] = [
    { value: '', text: 'All Statuses' },
    { value: 'Active', text: 'Active' },
    { value: 'Pending', text: 'Pending' },
    { value: 'Completed', text: 'Completed' }
  ];

  assignedToOptions: any[] = [
    { value: '', text: 'All Users' },
    { value: 'Shafeka Moosa', text: 'Shafeka Moosa' },
    { value: 'John Smith', text: 'John Smith' },
    { value: 'Sarah Johnson', text: 'Sarah Johnson' }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.initializeGrid();
    this.loadCustomers();
  }

  private initializeGrid(): void {
    this.columnDefs = [
      {
        headerName: 'Edit ID',
        field: 'editId',
        width: 80,
        cellRenderer: this.editIdRenderer.bind(this),
        cellStyle: { 'text-align': 'center', 'font-weight': 'bold' }
      },
      {
        headerName: 'Company Code',
        field: 'companyCode',
        width: 120,
        cellStyle: { 'text-align': 'center' }
      },
      {
        headerName: 'Company Name',
        field: 'companyName',
        width: 200,
        filter: 'agTextColumnFilter',
        cellStyle: { 'font-weight': 'bold' }
      },
      {
        headerName: 'PO',
        field: 'po',
        width: 60,
        cellStyle: { 'text-align': 'center' }
      },
      {
        headerName: 'Account Type',
        field: 'accountType',
        width: 100,
        filter: 'agSetColumnFilter',
        cellStyle: { 'text-align': 'center' }
      },
      {
        headerName: 'Suburb',
        field: 'suburb',
        width: 120,
        filter: 'agSetColumnFilter',
        cellStyle: { 'text-align': 'center' }
      },
      {
        headerName: 'Assigned To',
        field: 'assignedTo',
        width: 140,
        filter: 'agSetColumnFilter',
        cellStyle: { 'text-align': 'center' }
      },
      {
        headerName: 'Created By',
        field: 'createdBy',
        width: 140,
        filter: 'agSetColumnFilter',
        cellStyle: { 'text-align': 'center' }
      },
      {
        headerName: 'Last Comment',
        field: 'lastComment',
        width: 300,
        filter: 'agTextColumnFilter',
        cellRenderer: this.commentRenderer.bind(this),
        autoHeight: true,
        wrapText: true,
        cellStyle: {
          'white-space': 'normal',
          'line-height': '1.4'
        }
      },
      {
        headerName: 'Next Step',
        field: 'nextStep',
        width: 180,
        filter: 'agSetColumnFilter',
        cellStyle: { 'text-align': 'center' }
      },
      {
        headerName: 'Next Step Other',
        field: 'nextStepOther',
        width: 140,
        filter: 'agTextColumnFilter',
        cellStyle: { 'text-align': 'center' }
      },
      {
        headerName: 'Archive',
        field: 'archive',
        width: 80,
        cellRenderer: this.archiveRenderer.bind(this),
        cellStyle: { 'text-align': 'center' }
      }
    ];
  }

  private loadCustomers(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.gridData = this.generateMockCustomers();
      this.isLoading = false;
    }, 1000);
  }

  private generateMockCustomers(): any[] {
    return [
      {
        id: '1',
        editId: 2261,
        companyCode: '',
        companyName: 'Greenhill Laboratories (Shaun)',
        po: 'No',
        accountType: 'IA',
        suburb: 'Hilton',
        assignedTo: 'Shafeka Moosa',
        createdBy: 'Shafeka Moosa',
        lastComment: 'Hi Shafeka I am so so sorry to do this to you again! I completely forgot about an off-site all day event today, so we won\'t be available this afternoon. Please accept my apologies!',
        nextStep: 'None',
        nextStepOther: '',
        archive: 'Active'
      },
      {
        id: '2',
        editId: 2258,
        companyCode: '',
        companyName: 'SGS Somerset',
        po: 'No',
        accountType: 'IA',
        suburb: 'Somerset West',
        assignedTo: 'Shafeka Moosa',
        createdBy: 'Shafeka Moosa',
        lastComment: 'On 07 July 2025. I received a call from Michael. We had a discussion regarding the costing, required deposit, monthly fee and annual costs. I answered all questions and it was clearly understood.',
        nextStep: 'Follow Up Review On Last Email Sent',
        nextStepOther: '',
        archive: 'Active'
      },
      {
        id: '3',
        editId: 2256,
        companyCode: '',
        companyName: 'InZfood Strand',
        po: 'No',
        accountType: 'IA',
        suburb: 'Strand',
        assignedTo: 'Shafeka Moosa',
        createdBy: 'Shafeka Moosa',
        lastComment: '',
        nextStep: '',
        nextStepOther: '',
        archive: 'Active'
      },
      {
        id: '4',
        editId: 2253,
        companyCode: '',
        companyName: 'Scientific Services',
        po: 'No',
        accountType: 'IA',
        suburb: 'Ndabeni',
        assignedTo: 'Shafeka Moosa',
        createdBy: 'Shafeka Moosa',
        lastComment: 'Please see latest email update to Sandisive, 13 October 2025. Good morning Sandisive, I hope you well and had a wonderful weekend. I just wanted to follow up to see if there are any updates',
        nextStep: 'Follow Up Review On Last Email Sent',
        nextStepOther: '',
        archive: 'Active'
      }
    ];
  }

  // Custom cell renderers
  editIdRenderer(params: any): string {
    if (!params.value) return '';
    return `<div style="color: #007bff; cursor: pointer; text-decoration: underline;">${params.value}</div>`;
  }

  commentRenderer(params: any): string {
    if (!params.value) return '';
    return `<div style="white-space: normal; line-height: 1.4; padding: 2px 0;">${params.value}</div>`;
  }

  archiveRenderer(params: any): string {
    const archive = params.value;
    if (archive === 'Active') {
      return `<span class="badge bg-success" style="font-size: 11px; padding: 2px 6px;">${archive}</span>`;
    }
    return '';
  }

  // Grid event handlers
  onGridReady(params: GridReadyEvent): void {
    console.log('AG Grid ready');
    setTimeout(() => {
      params.api.sizeColumnsToFit();
    }, 100);
  }

  onRowDoubleClicked(event: any): void {
    const customer = event.data;
    this.editCustomer(customer);
  }

  onCellClicked(event: any): void {
    if (event.colDef.field === 'editId') {
      this.editCustomer(event.data);
    }
  }

  // Search and filter methods
  onSearch(): void {
    console.log('Searching for:', this.searchTerm);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.onSearch();
  }

  onFilterChange(): void {
    this.onSearch();
  }

  // Action methods
  goToCreate() {
    this.router.navigate(['/customer/create']);
  }

  editCustomer(customer: any): void {
    console.log('Editing customer:', customer);
    this.router.navigate(['/customer/edit', customer.id]);
  }

  refreshData(): void {
    this.loadCustomers();
  }
}
