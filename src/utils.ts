import {GridSortModel} from "@mui/x-data-grid/models/gridSortModel";

export function getOrder(sort: GridSortModel) {
    let order: Record<string, string> = {};
    for (const gridSortEntry of sort) {
        if (gridSortEntry.sort)
            order[gridSortEntry.field] = gridSortEntry.sort.toUpperCase();
    }
    return order;
}
