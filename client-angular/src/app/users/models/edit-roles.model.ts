export class EditRolesModel {
    constructor(
        public allRoles: string[],
        public availableRoles: string[],
        public currentRoles: string[],
        public selectedRoles: string[]
    ) { }
}
