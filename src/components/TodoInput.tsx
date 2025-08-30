import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Zap, AlertCircle, Minus } from 'lucide-react';
import { Priority } from '@/types/todo';
import { cn } from '@/lib/utils';

interface TodoInputProps {
  onAdd: (text: string, priority: Priority) => void;
}

const priorityConfig = {
  low: { icon: Minus, label: 'Низкий', color: 'text-blue-500' },
  medium: { icon: AlertCircle, label: 'Средний', color: 'text-yellow-500' },
  high: { icon: Zap, label: 'Высокий', color: 'text-red-500' }
};

export function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim(), priority);
      setText('');
    }
  };

  const PriorityIcon = priorityConfig[priority].icon;

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 animate-fade-in">
      <div className="flex-1">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Добавить новую задачу..."
          className="h-12 text-base bg-card border-2 focus:border-primary transition-all duration-200"
        />
      </div>
      
      <Select value={priority} onValueChange={(value: Priority) => setPriority(value)}>
        <SelectTrigger className="w-32 h-12 bg-card">
          <SelectValue>
            <div className="flex items-center gap-2">
              <PriorityIcon className={cn("h-4 w-4", priorityConfig[priority].color)} />
              <span className="hidden sm:inline">{priorityConfig[priority].label}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {Object.entries(priorityConfig).map(([key, config]) => {
            const Icon = config.icon;
            return (
              <SelectItem key={key} value={key}>
                <div className="flex items-center gap-2">
                  <Icon className={cn("h-4 w-4", config.color)} />
                  {config.label}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      <Button 
        type="submit" 
        size="lg"
        className="h-12 px-6 bg-primary hover:bg-primary-hover transition-all duration-200 hover:scale-105"
        disabled={!text.trim()}
      >
        <Plus className="h-5 w-5" />
      </Button>
    </form>
  );
}