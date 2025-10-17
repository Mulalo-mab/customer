import { Component, AfterViewInit } from '@angular/core';
import { ColDef, ModuleRegistry, AllCommunityModule, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Router } from '@angular/router';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-customer-index',
  standalone: false,
  templateUrl: './customer-index.html',
  styleUrl: './customer-index.css'
})
export class CustomerIndex implements AfterViewInit {

  constructor(private router: Router) { }

  // Add missing property
  showActive = true;

  // Page selection properties
  selectedPage: number = 5;
  pageOptions: number[] = [1, 2, 3, 4, 5];
  searchTerm: string = '';

  // Pagination properties
  currentPage: number = 1;
  totalPages: number = 5;
  visiblePages: number[] = [1, 2, 3, 4, 5];

  // AG Grid API
  private gridApi!: GridApi;

  // Original data and filtered data
  originalData = [
    { Edit: '', ID: '2261', CompanyCode: '', CompanyName: 'GreenHill Laboratories', PO: 'No', AccountType: 'IA', Suburb: 'Hilton', AssignedTo: 'Shafieka Moosa', CreatedBy: 'Shafieka Moosa', LastComment: 'Hi Shafieka I am so so sorry to do this to you again!', NextStep: 'None', NextStepOther: '', Archive: '' },
    { Edit: '', ID: '2258', CompanyCode: '', CompanyName: 'SGS Somerset', PO: 'No', AccountType: 'IA', Suburb: 'Somerset West', AssignedTo: 'Shafieka Moosa', CreatedBy: 'Shafieka Moosa', LastComment: 'Hi Shafieka I am so so sorry to do this to you again!', NextStep: 'None', NextStepOther: '', Archive: '' },
    { Edit: '', ID: '2256', CompanyCode: '', CompanyName: 'in2food Strand', PO: 'No', AccountType: 'IA', Suburb: 'Strand', AssignedTo: 'Shafieka Moosa', CreatedBy: 'Shafieka Moosa', LastComment: 'Hi Shafieka I am so so sorry to do this to you again!', NextStep: 'None', NextStepOther: '', Archive: '' },
    { Edit: '', ID: '2253', CompanyCode: '', CompanyName: 'Scientific Services', PO: 'No', AccountType: 'IA', Suburb: 'Ndabeni', AssignedTo: 'Shafieka Moosa', CreatedBy: 'Shafieka Moosa', LastComment: 'Hi Shafieka I am so so sorry to do this to you again!', NextStep: 'None', NextStepOther: '', Archive: '' }
  ];

  rowData = [...this.originalData]; // Start with all data

  colDefs: ColDef[] = [
    {
      field: "Edit",
      cellRenderer: () => {
        return '<button class="btn btn-sm btn-outline-primary"><i class="bi bi-pencil-square text-primary"></i></button>';
      },
      onCellClicked: (event) => {
        this.onEditClick(event.data);
      },
      width: 80
    },
    { field: "ID", width: 100 },
    { field: "CompanyCode", headerName: "Company Code", width: 150 },
    { field: "CompanyName", headerName: "Company Name", width: 200 },
    { field: "PO", width: 100 },
    { field: "AccountType", headerName: "Account Type", width: 130 },
    { field: "Suburb", width: 150 },
    { field: "AssignedTo", headerName: "Assigned To", width: 150 },
    { field: "CreatedBy", headerName: "Created By", width: 150 },
    { field: "LastComment", headerName: "Last Comment", width: 250 },
    { field: "NextStep", headerName: "Next Step", width: 120 },
    { field: "NextStepOther", headerName: "Next Step Other", width: 150 },
    {
      field: "Archive",
      cellRenderer: () => {
        return '<button class="btn btn-sm btn-outline-danger"> Archive</button>';
      },
      onCellClicked: (event) => {
        this.onArchiveClick(event.data);
      },
      width: 120
    }
  ];

  // Implement ngAfterViewInit
  ngAfterViewInit() {
    this.initializeToggleSwitch();
    this.updateVisiblePages(); // Initialize pagination pages
  }

  // AG Grid ready event
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  initializeToggleSwitch() {
    const toggleCheckbox = document.getElementById('IsActive') as HTMLInputElement;
    if (toggleCheckbox) {
      toggleCheckbox.addEventListener('change', (event) => {
        this.showActive = (event.target as HTMLInputElement).checked;
        this.updateToggleVisualState();
        this.filterCustomersByStatus(this.showActive);
      });

      // Set initial state
      this.updateToggleVisualState();
    }
  }

  // SEARCH FUNCTIONALITY - FIXED
  onSearch() {
    console.log('Searching for:', this.searchTerm);

    if (!this.searchTerm || this.searchTerm.trim() === '') {
      // If search is empty, show all data
      this.rowData = [...this.originalData];
    } else {
      // Filter data based on company name
      const searchTermLower = this.searchTerm.toLowerCase().trim();
      this.rowData = this.originalData.filter(customer =>
        customer.CompanyName.toLowerCase().includes(searchTermLower)
      );
    }

    // Update the grid with filtered data - FIXED METHOD
    if (this.gridApi) {
      // Method 1: Using setGridOption (recommended for newer AG Grid versions)
      this.gridApi.setGridOption('rowData', this.rowData);

      // Alternative method: If the above doesn't work, use this:
      // this.gridApi.applyTransaction({ update: this.rowData });
    }

    // Update pagination based on filtered results
    this.updatePaginationAfterSearch();
  }

  // Clear search
  onClearSearch() {
    this.searchTerm = '';
    this.rowData = [...this.originalData];

    if (this.gridApi) {
      this.gridApi.setGridOption('rowData', this.rowData);
    }

    this.updatePaginationAfterSearch();
    console.log('Search cleared');
  }

  // Handle search input keypress (Enter key)
  onSearchKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }

  // Update pagination after search
  private updatePaginationAfterSearch() {
    const filteredCount = this.rowData.length;
    const totalCount = this.originalData.length;

    console.log(`Search results: ${filteredCount} of ${totalCount} companies found`);

    // You can update pagination here based on filtered results
    this.currentPage = 1; // Reset to first page after search
    this.updateVisiblePages();
  }

  // Enhanced filter that combines search and status
  filterCustomersByStatus(showActive: boolean) {
    console.log('Filtering by status:', showActive ? 'Active' : 'Archive');

    // First apply search filter if there's a search term
    let filteredData = [...this.originalData];

    if (this.searchTerm && this.searchTerm.trim() !== '') {
      const searchTermLower = this.searchTerm.toLowerCase().trim();
      filteredData = filteredData.filter(customer =>
        customer.CompanyName.toLowerCase().includes(searchTermLower)
      );
    }

    // Then apply status filter (you can modify this based on your Archive field logic)
    if (showActive) {
      // Show active customers (assuming Archive field empty means active)
      this.rowData = filteredData.filter(customer => !customer.Archive || customer.Archive === '');
    } else {
      // Show archived customers
      this.rowData = filteredData.filter(customer => customer.Archive && customer.Archive !== '');
    }

    // Update the grid - FIXED METHOD
    if (this.gridApi) {
      this.gridApi.setGridOption('rowData', this.rowData);
    }

    this.updatePaginationAfterSearch();
  }

  // Pagination methods
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.selectedPage = page; // Sync with the page selector
      this.updateVisiblePages();
      this.loadPageData(page);
    }
  }

  updateVisiblePages() {
    // Show pages around current page (you can customize this logic)
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, this.currentPage + 2);

    this.visiblePages = [];
    for (let i = startPage; i <= endPage; i++) {
      this.visiblePages.push(i);
    }
  }

  loadPageData(pageNumber: number) {
    console.log('Loading data for page:', pageNumber);
    // Add your actual pagination logic here
    // Example: this.customerService.getCustomers(pageNumber, this.pageSize).subscribe(...);
  }

  updateToggleVisualState() {
    const toggleCheckbox = document.getElementById('IsActive') as HTMLInputElement;
    const toggleGroup = document.querySelector('.toggle-group') as HTMLElement;

    if (toggleCheckbox && toggleGroup) {
      if (this.showActive) {
        toggleGroup.style.left = '0';
        toggleCheckbox.checked = true;
      } else {
        toggleGroup.style.left = '-100%';
        toggleCheckbox.checked = false;
      }
    }
  }

  onToggleClick() {
    this.showActive = !this.showActive;
    this.updateToggleVisualState();
    this.filterCustomersByStatus(this.showActive);
  }

  onEditClick(customerData: any) {
    console.log('Edit customer:', customerData);
    this.router.navigate(['/customers/edit', customerData.ID]);
  }

  onArchiveClick(customerData: any) {
    console.log('Archive customer:', customerData);

    // Show confirmation dialog
    if (confirm(`Are you sure you want to archive ${customerData.CompanyName}?`)) {
      // Add your archive logic here
      this.archiveCustomer(customerData.ID);
    }
  }

  onPageChange() {
    console.log('Selected page:', this.selectedPage);
    this.goToPage(this.selectedPage);
  }

  archiveCustomer(customerId: string) {
    // Here you would typically call a service to archive the customer
    console.log(`Archiving customer with ID: ${customerId}`);

    // Example: Update the rowData to show it's archived
    const customerIndex = this.originalData.findIndex(customer => customer.ID === customerId);
    if (customerIndex !== -1) {
      // You can update the customer data here, or remove it from the list
      // For example, change the Archive field to show it's archived
      this.originalData[customerIndex].Archive = 'Archived';

      // Refresh the grid data
      this.filterCustomersByStatus(this.showActive);

      // Show success message
      alert('Customer archived successfully!');
    }
  }
}
