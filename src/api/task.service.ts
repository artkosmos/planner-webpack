import {ITask} from "@/common";

export const taskService = (() => {
  const taskList: ITask[] = []

  const getTask = (id: string) => {
    return new Promise<ITask>((resolve, reject) => {
      setTimeout(() => {
        const task = taskList.find((item) => item.id === id)
        if (task) {
          resolve(task)
        } else {
          reject(new Error('Specified task wasn\'t found'))
        }
      }, 1500)
    })
  }

  const getTaskList = () => {
    return new Promise<ITask[]>((resolve) => {
      setTimeout(() => {
        resolve(taskList)
      }, 2500)
    })
  }

  const createTask = ({id, title, date}: ITask) => {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        const newTask = {id, title, date}
        taskList.unshift(newTask)
        resolve('Task was created successfully')
      }, 1500)
    })
  }

  const deleteTask = (id: string) => {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        const index = taskList.findIndex((item) => item.id === id)
        if (index !== -1) {
          taskList.splice(index, 1)
          resolve('Task was deleted successfully')
        } else {
          reject(new Error('Specified task wasn\'t found'))
        }
      }, 1500)
    })
  }

  const updateTask = ({id, title, date}: ITask) => {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        const task = taskList.find((item) => item.id === id)
        if (task) {
          task.title = title
          task.date = date
          resolve('Task was updated successfully')
        } else {
          reject(new Error('Specified task wasn\'t found'))
        }
      }, 1500)
    })
  }

  return {
    getTask,
    getTaskList,
    createTask,
    deleteTask,
    updateTask
  }

})()

export default taskService