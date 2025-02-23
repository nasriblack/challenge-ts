type Task = {
    id: string;
    title: string;
    completed: boolean;
}

type Project = {
    id: string;
    name: string;
    tasks: Task[]
}

type User = {
    id: string;
    name: string;
    projects: Project[]
}


const creatUser = (users: User[], userName: string): User[] => {
    const userObject: User = {
        id: (users.length + 1).toString(),
        name: userName,
        projects: []
    }
    const addUser = [...users, userObject]
    return addUser;
}

const createProject = (users: User[], userId: string, projectName: string): User[] => {
    return users.map(user =>
        user.id === userId
            ? {
                  ...user,
                  projects: [
                      ...user.projects,
                      { id: (user.projects.length + 1).toString(), name: projectName, tasks: [] },
                  ],
              }
            : user
    );
};



const addTask = (users: User[], userId: string, projectId: string, taskTitle: string): User[] => {

    return users.map(user => 

        user.id === userId ? 
        {...user,
            projects:user.projects.map(project=> project.id === projectId ? 
                {...project,

                    tasks:[...project.tasks, {id:(project.tasks.length + 1).toString(), completed:false,title:taskTitle}]
                }
                :
                project
            )
        }
        : user
    )

}



const markTaskCompleted = (users:User[], userId:string, projectId:string, taskId:string): User[] => {
    return users.map(user=> user.id === userId ? 

        {...user,
            projects:user.projects.map(project=> project.id === projectId ? 
                {...project,
                    tasks:project.tasks.map(task=> task.id === taskId ? 
                        {...task,
                            completed:true
                        }
                        :
                        task
                    )

                }
                :
                project
            )

        } : user
    )
}

const getPendingTasks = (users:User[], userId:string):Task[] => {
    const findUser = users.find(item => item.id === userId)
    if(!findUser) return []

    return findUser.projects.flatMap(project => project.tasks.filter(task => !task.completed));

}
const getCompletedTasks = (users:User[], userId:string):Task[] => {
    const findUser = users.find(item => item.id === userId)
    if(!findUser) return []

    return findUser.projects.flatMap(project => project.tasks.filter(task => task.completed));

}
