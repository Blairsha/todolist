import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, X, ArrowUpDown, Calendar, Filter } from 'lucide-react';
import { SortType } from '@/types/todo';
import { cn } from '@/lib/utils';

interface TodoSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortType;
  onSortChange: (sort: SortType) => void;
  showCompleted: boolean;
  onShowCompletedChange: (show: boolean) => void;
}

const sortLabels: Record<SortType, string> = {
  created: 'По дате создания',
  priority: 'По приоритету', 
  dueDate: 'По сроку выполнения',
  alphabetical: 'По алфавиту'
};

export function TodoSearch({ 
  searchQuery, 
  onSearchChange, 
  sortBy, 
  onSortChange,
  showCompleted,
  onShowCompletedChange
}: TodoSearchProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-3 animate-fade-in">
  
      <div className="relative">
        <Search className={cn(
          "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-200",
          isFocused ? "text-primary" : "text-muted-foreground"
        )} />
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Поиск задач..."
          className="pl-10 pr-10 h-10 bg-card border-2 focus:border-primary transition-all duration-200"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSearchChange('')}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>


      <div className="flex flex-wrap gap-2 items-center">
        {/* Сортировать */}
        <Select value={sortBy} onValueChange={(value: SortType) => onSortChange(value)}>
          <SelectTrigger className="w-44 h-9 bg-card">
            <SelectValue>
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4" />
                <span className="truncate">{sortLabels[sortBy]}</span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {Object.entries(sortLabels).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                <div className="flex items-center gap-2">
                  {key === 'dueDate' && <Calendar className="h-4 w-4" />}
                  {key === 'priority' && <Filter className="h-4 w-4" />}
                  {label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant={showCompleted ? "default" : "outline"}
          size="sm"
          onClick={() => onShowCompletedChange(!showCompleted)}
          className="transition-all duration-200"
        >
          {showCompleted ? 'Скрыть выполненные' : 'Показать выполненные'}
        </Button>
      </div>
    </div>
  );
}