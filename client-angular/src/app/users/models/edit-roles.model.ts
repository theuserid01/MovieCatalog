export class EditRolesModel {
    constructor(
        public roles: string[],
        public allRoles: string[],
        public availableRoles: string[],
        public currentRoles: string[],
        public selectedRoles: string[]
    ) { }
}
