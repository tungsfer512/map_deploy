import React from 'react'
import { useTranslation } from 'react-i18next';

import {
    DataGrid,
    GridToolbar,
} from '@mui/x-data-grid';
import CustomPagination from "../CustomPagination/CustomPagination";

const DataTable = ({ rows, columns }) => {
    const { t, i18n } = useTranslation();
    let pageSize = rows?.length;
    if (pageSize < 10) {
        pageSize = 10;
    }

    return (
        <DataGrid
            getRowHeight={() => 'auto'}
            localeText={{
                // Root
                noRowsLabel: t('table.noRowsLabel'),
                noResultsOverlayLabel: t('table.noResultsOverlayLabel'),
                errorOverlayDefaultLabel: t('table.errorOverlayDefaultLabel'),

                // Density selector toolbar  t("table.toolbar"),
                toolbarDensity: t("table.toolbarDensity"),
                toolbarDensityLabel: t("table.toolbarDensityLabel"),
                toolbarDensityCompact: t("table.toolbarDensityCompact"),
                toolbarDensityStandard: t("table.toolbarDensityStandard"),
                toolbarDensityComfortable: t("table.toolbarDensityComfortable"),

                // Columns selector toolbar  t("table.toolbar"),
                toolbarColumns: t("table.toolbarColumns"),
                toolbarColumnsLabel: t("table.toolbarColumnsLabel"),

                // Filters toolbar  t("table.toolbar"),
                toolbarFilters: t("table.toolbarFilters"),
                toolbarFiltersLabel: t("table.toolbarFiltersLabel"),
                toolbarFiltersTooltipHide: t("table.toolbarFiltersTooltipHide"),
                toolbarFiltersTooltipShow: t("table.toolbarFiltersTooltipShow"),
                toolbarFiltersTooltipActive: t("table.toolbarFiltersTooltipActive"),


                // Quick filter toolbar  t("table.toolbar"),
                toolbarQuickFilterPlaceholder: t("table.toolbarQuickFilterPlaceholder"),
                toolbarQuickFilterLabel: t("table.toolbarQuickFilterLabel"),
                toolbarQuickFilterDeleteIconLabel: t("table.toolbarQuickFilterDeleteIconLabel"),

                // Export selector toolbar  t("table.toolbar"),
                toolbarExport: t("table.toolbarExport"),
                toolbarExportLabel: t("table.toolbarExportLabel"),
                toolbarExportCSV: t("table.toolbarExportCSV"),
                toolbarExportPrint: t("table.toolbarExportPrint"),
                // toolbarExportExcel: t("table.toolbarExportExcel"),

                // Columns panel text
                columnsPanelTextFieldLabel: t("table.columnsPanelTextFieldLabel"),
                columnsPanelTextFieldPlaceholder: t("table.columnsPanelTextFieldPlaceholder"),
                columnsPanelDragIconLabel: t("table.columnsPanelDragIconLabel"),
                columnsPanelShowAllButton: t("table.columnsPanelShowAllButton"),
                columnsPanelHideAllButton: t("table.columnsPanelHideAllButton"),

                // Filter panel text
                filterPanelAddFilter: t("table.filterPanelAddFilter"),
                filterPanelDeleteIconLabel: t("table.filterPanelDeleteIconLabel"),
                // t("table.//"),
                filterPanelOperators: t("table.filterPanelOperators"),

                // t("table.//"),
                filterPanelOperatorAnd: t("table.filterPanelOperatorAnd"),
                filterPanelOperatorOr: t("table.filterPanelOperatorOr"),
                filterPanelColumns: t("table.filterPanelColumns"),
                filterPanelInputLabel: t("table.filterPanelInputLabel"),
                filterPanelInputPlaceholder: t("table.filterPanelInputPlaceholder"),

                // Filter operators text
                filterOperatorContains: t("table.filterOperatorContains"),
                filterOperatorEquals: t("table.filterOperatorEquals"),
                filterOperatorStartsWith: t("table.filterOperatorStartsWith"),
                filterOperatorEndsWith: t("table.filterOperatorEndsWith"),
                filterOperatorIs: t("table.filterOperatorIs"),
                filterOperatorNot: t("table.filterOperatorNot"),
                filterOperatorAfter: t("table.filterOperatorAfter"),
                filterOperatorOnOrAfter: t("table.filterOperatorOnOrAfter"),
                filterOperatorBefore: t("table.filterOperatorBefore"),
                filterOperatorOnOrBefore: t("table.filterOperatorOnOrBefore"),
                filterOperatorIsEmpty: t("table.filterOperatorIsEmpty"),
                filterOperatorIsNotEmpty: t("table.filterOperatorIsNotEmpty"),
                // t("table.//"),

                // Filter values text
                filterValueAny: t("table.filterValueAny"),
                filterValueTrue: t("table.filterValueTrue"),
                filterValueFalse: t("table.filterValueFalse"),

                // Column menu text
                columnMenuLabel: t("table.columnMenuLabel"),
                columnMenuShowColumns: t("table.columnMenuShowColumns"),
                columnMenuFilter: t("table.columnMenuFilter"),
                columnMenuHideColumn: t("table.columnMenuHideColumn"),
                columnMenuUnsort: t("table.columnMenuUnsort"),
                columnMenuSortAsc: t("table.columnMenuSortAsc"),
                columnMenuSortDesc: t("table.columnMenuSortDesc"),

                // Column header text
                columnHeaderFiltersTooltipActive: t("table.columnHeaderFiltersTooltipActive"),

                columnHeaderFiltersLabel: t("table.columnHeaderFiltersLabel"),
                columnHeaderSortIconLabel: t("table.columnHeaderSortIconLabel"),

                // Rows selected footer text
                footerRowSelected: t("table.footerRowSelected"),


                // Total row amount footer text
                footerTotalRows: t("table.footerTotalRows"),

                // Total visible row amount footer text
                footerTotalVisibleRows: t("table.footerTotalVisibleRows"),


                // Checkbox selection text
                checkboxSelectionHeaderName: t("table.checkboxSelectionHeaderName"),
                // t("table.//"),
                // t("table.//"),
                // t("table.//"),
                // t("table.//"),

                // Boolean cell text
                booleanCellTrueLabel: t("table.booleanCellTrueLabel"),
                booleanCellFalseLabel: t("table.booleanCellFalseLabel"),

                // Actions cell more text
                actionsCellMore: t("table.actionsCellMore"),

                // Column pinning text
                pinToLeft: t("table.pinToLeft"),
                pinToRight: t("table.pinToRight"),
                unpin: t("table.unpin"),

                // Tree Data
                treeDataGroupingHeaderName: t("table.treeDataGroupingHeaderName"),
                treeDataExpand: t("table.treeDataExpand"),
                treeDataCollapse: t("table.treeDataCollapse"),
                filterOperatorIsAnyOf: t("table.filterOperatorIsAnyOf"),
            }}
            rows={rows}
            columns={columns}
            getRowId={(row) => {
                return row.id;
            }}
            // onRowClick={handleRowClick}
            disableColumnMenu
            disableColumnSelector
            disableSelectionOnClick
            // hideFooter
            autoHeight
            pageSize={10}
            rowsPerPageOptions={[10]}
            // disableColumnFilter
            // disableDensitySelector
            components={{ Toolbar: GridToolbar, Pagination: CustomPagination, }}
            componentsProps={{
                toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                },
            }}
            sx={{

                // '& .MuiDataGrid-row': { cursor: 'pointer' },
                "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
                    outline: "none"
                },
                '& .MuiDataGrid-toolbarContainer': {
                    padding: '12px 16px 8px',
                    borderBottom: '1px solid #e0e0e0',
                },
                '& .MuiInputBase-input': {
                    padding: '8px 0px',
                    fontSize: '0.875rem',
                    lineHeight: '1.25rem',
                    fontWeight: '400',
                    letterSpacing: '0.01071em',
                },
            }}
            rowCount={rows?.length}
        />

    )
}

export default DataTable