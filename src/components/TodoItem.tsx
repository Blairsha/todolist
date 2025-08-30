import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Zap, AlertCircle, Minus, Calendar } from 'lucide-react';
import { Todo } from '@/types/todo';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const priorityConfig = {
  low: { icon: Minus, label: 'Низкий', color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  medium: { icon: AlertCircle, label: 'Средний', color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
  high: { icon: Zap, label: 'Высокий', color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30' }
};

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(todo.id), 150);
  };

  const PriorityIcon = priorityConfig[todo.priority].icon;
  const isOverdue = todo.dueDate && new Date() > todo.dueDate && !todo.completed;

  return (
    <div
      className={cn(
        "group flex items-center gap-4 p-4 bg-card rounded-lg border transition-all duration-300 hover:shadow-lg animate-slide-up",
        todo.completed && "opacity-60",
        isDeleting && "opacity-0 scale-95 transform",
        isOverdue && "border-destructive/50 bg-destructive/5"
      )}
    >
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        className="data-[state=checked]:bg-success data-[state=checked]:border-success transition-all duration-200"
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={cn(
              "font-medium transition-all duration-200",
              todo.completed && "line-through text-muted-foreground"
            )}
          >
            {todo.text}
          </span>
          <Badge variant="secondary" className={cn("flex items-center gap-1 text-xs", priorityConfig[todo.priority].bg)}>
            <PriorityIcon className={cn("h-3 w-3", priorityConfig[todo.priority].color)} />
            <span className="hidden sm:inline">{priorityConfig[todo.priority].label}</span>
          </Badge>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{format(todo.createdAt, 'dd MMM yyyy', { locale: ru })}</span>
          {todo.dueDate && (
            <>
              <span>•</span>
              <div className={cn(
                "flex items-center gap-1",
                isOverdue && "text-destructive font-medium"
              )}>
                <Calendar className="h-3 w-3" />
                <span>до {format(todo.dueDate, 'dd MMM', { locale: ru })}</span>
                {isOverdue && <span className="text-xs">просрочено</span>}
              </div>
            </>
          )}
          {todo.category && (
            <>
              <span>•</span>
              <Badge variant="outline" className="text-xs">
                {todo.category}
              </Badge>
            </>
          )}
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-destructive hover:text-destructive hover:bg-destructive/10 hover:scale-110"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}