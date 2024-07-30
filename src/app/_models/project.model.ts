export class Project {
    _id!: string;
    ownerId!: string;
    ownerName!: string;
    title!: string;
    description!: string;
    likes!: number;
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

export class Kanban {
    _id?: string;
    projectId!: string;
    newIssues: string[] = [];
    productBacklog: string[] = [];
    inProgress: string[] = [];
    done: string[] = [];
}
