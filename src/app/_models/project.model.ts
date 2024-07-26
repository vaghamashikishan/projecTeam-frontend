export class Project {
    _id!: string;
    ownerId!: string;
    ownerName!: string;
    title!: string;
    description!: string;
    technologies!: Technology[];
    collabSkills?: string[];
    collaborators?: string[][];
    createdAt?: Date;
    updatedAt?: Date;
}

export class Technology {
    _id!: string;
    name!: string;
}
