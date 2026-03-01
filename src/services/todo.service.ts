import fs from 'fs-extra';
import path from 'path';
import os from 'os';

export interface Todo {
  id: string;
  task: string;
  completed: boolean;
}

/**
 * Todo Service: Persistent task lifecycle management.
 * High-performance file-based storage using fs-extra.
 */
export class TodoService {
  private storagePath: string;

  constructor() {
    this.storagePath = path.join(os.homedir(), '.nexus-todos.json');
  }

  async getTodos(): Promise<Todo[]> {
    if (!(await fs.pathExists(this.storagePath))) {
      return [];
    }
    return fs.readJSON(this.storagePath);
  }

  async saveTodos(todos: Todo[]): Promise<void> {
    await fs.writeJSON(this.storagePath, todos, { spaces: 2 });
  }

  async add(task: string): Promise<void> {
    const todos = await this.getTodos();
    todos.push({ id: Math.random().toString(36).substring(7), task, completed: false });
    await this.saveTodos(todos);
  }

  async remove(id: string): Promise<void> {
    const todos = (await this.getTodos()).filter(t => t.id !== id);
    await this.saveTodos(todos);
  }
}
