import {ITask} from "@/common";

const taskService = (() => {
  const taskList: ITask[] = []
  const timeoutDelay = 500

  const getTask = (id: string) => {
    return new Promise<ITask>((resolve, reject) => {
      setTimeout(() => {
        const task = taskList.find((item) => item.id === id)
        if (task) {
          resolve(task)
        } else {
          reject(new Error('Specified task wasn\'t found'))
        }
      }, timeoutDelay)
    })
  }

  const getTaskList = () => {
    return new Promise<ITask[]>((resolve) => {
      setTimeout(() => {
        resolve([...taskList])
      }, timeoutDelay)
    })
  }

  const createTask = ({id, title, date}: ITask) => {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        const newTask = {id, title, date}
        taskList.unshift(newTask)
        resolve('Task was created successfully')
      }, timeoutDelay)
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
      }, timeoutDelay)
    })
  }

  const updateTask = ({id, title, date}: ITask) => {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        const index = taskList.findIndex((item) => item.id === id)
        if (index !== -1) {
          taskList[index] = {id, title, date}
          resolve('Task was updated successfully')
        } else {
          reject(new Error('Specified task wasn\'t found'))
        }
      }, timeoutDelay)
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