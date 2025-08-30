import { TodoInput } from '@/components/TodoInput';
import { TodoItem } from '@/components/TodoItem';
import { TodoFilters } from '@/components/TodoFilters';
import { TodoStats } from '@/components/TodoStats';
import { TodoSearch } from '@/components/TodoSearch';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTodos } from '@/hooks/useTodos';
import { CheckSquare } from 'lucide-react';

const Index = () => {
  const {
    todos,
    filter,
    stats,
    searchQuery,
    sortBy,
    showCompleted,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    setFilter,
    setSearchQuery,
    setSortBy,
    setShowCompleted
  } = useTodos();

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-3 mb-4">
              <CheckSquare className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">TodoApp</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Управляйте своими задачами эффективно
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* Add Todo Input */}
        <div className="mb-6">
          <TodoInput onAdd={addTodo} />
        </div>

        {/* Search and Sort */}
        <div className="mb-6">
          <TodoSearch
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            showCompleted={showCompleted}
            onShowCompletedChange={setShowCompleted}
          />
        </div>

        {/* Filters */}
        <div className="mb-6">
          <TodoFilters
            currentFilter={filter}
            onFilterChange={setFilter}
            totalCount={stats.total}
            activeCount={stats.active}
            completedCount={stats.completed}
          />
        </div>

        {/* Todo List */}
        <div className="space-y-3 mb-6">
          {todos.length === 0 ? (
            <div className="text-center py-12">
              <CheckSquare className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                {filter === 'completed' ? 'Нет выполненных задач' :
                 filter === 'active' ? 'Нет активных задач' : 'Список задач пуст'}
              </h3>
              <p className="text-muted-foreground">
                {filter === 'all' ? 'Добавьте первую задачу выше' : 'Попробуйте другой фильтр'}
              </p>
            </div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </div>

        {/* Stats */}
        {stats.total > 0 && (
          <TodoStats
            activeCount={stats.active}
            completedCount={stats.completed}
            totalCount={stats.total}
            highPriorityCount={stats.highPriority}
            onClearCompleted={clearCompleted}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
