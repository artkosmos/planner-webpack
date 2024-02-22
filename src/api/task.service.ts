import {ITask} from "@/common";

const initialState: ITask[] = [
  {id: 'da08a866', title: 'Project deadline', date: '2024-03-31T09:00:00.000Z'},
  {id: '2bc96e10', title: 'Meeting with friends at a cafe', date: '2024-02-24T16:10:00.000Z'},
  {id: '4daf2fc4', title: 'Go shopping', date: '2024-02-23T11:25:30.000Z'}
]

const taskService = (() => {
  let taskList = initialState

  const getTask = (id: string) => {
    return new Promise<ITask>((resolve, reject) => {
      setTimeout(() => {
        const task = taskList.find((item) => item.id === id)
        if (task) {
          resolve(task)
        } else {
          reject(new Error('Specified task wasn\'t found'))
        }
      }, 500)
    })
  }

  const getTaskList = () => {
    return new Promise<ITask[]>((resolve) => {
      setTimeout(() => {
        resolve([...taskList])
      }, 500)
    })
  }

  const createTask = ({id, title, date}: ITask) => {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        const newTask = {id, title, date}
        taskList.unshift(newTask)
        resolve('Task was created successfully')
      }, 500)
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
      }, 500)
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
      }, 500)
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