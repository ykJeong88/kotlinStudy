package com.ykjeong.todolist.service

import com.ykjeong.todolist.repository.Todo
import com.ykjeong.todolist.repository.TodoRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class TodoService (

        private val todoRepository: TodoRepository

) {
    fun getTodos() = todoRepository.findAll()

    fun insertTodo(todoName: String) = todoRepository.save(Todo(todoName = todoName))

    fun updateTodo(todoId: Long): Todo {
        val todo = todoRepository.findByIdOrNull(todoId) ?: throw Exception()
        todo.completed = !todo.completed
        return todoRepository.save(todo)
    }

    fun deleteTodo(todoId: Long) = todoRepository.deleteById(todoId)

}