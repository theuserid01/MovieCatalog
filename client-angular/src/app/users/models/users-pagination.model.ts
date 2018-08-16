export class UsersPaginationModel {
    constructor(
        public currentPage: number,
        public hasNextPage: boolean,
        public hasPrevPage: boolean,
        public nextPage: number,
        public prevPage: number,
        public search: string,
        public queryPage,
        public querySearch: string,
        public totalPages: number,
        public totalPagesRange: number[]
    ) { }
}
