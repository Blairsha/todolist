import { Button } from '@/components/ui/button';
import { FilterType } from '@/types/todo';
import { cn } from '@/lib/utils';

interface TodoFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  totalCount: number;
  activeCount: number;
  completedCount: number;
}

const filterLabels: Record<FilterType, string> = {
  all: 'Все',
  active: 'Активные',
  completed: 'Выполненные'
};

export function TodoFilters({ 
  currentFilter, 
  onFilterChange, 
  totalCount, 
  activeCount, 
  completedCount 
}: TodoFiltersProps) {
  const getCounts = (filter: FilterType) => {
    switch (filter) {
      case 'all': return totalCount;
      case 'active': return activeCount;
      case 'completed': return completedCount;
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {(Object.keys(filterLabels) as FilterType[]).map((filter) => {
        const count = getCounts(filter);
        const isActive = currentFilter === filter;
        
        return (
          <Button
            key={filter}
            variant={isActive ? "default" : "secondary"}
            onClick={() => onFilterChange(filter)}
            className={cn(
              "relative transition-all duration-200",
              isActive && "bg-primary hover:bg-primary-hover shadow-md"
            )}
          >
            {filterLabels[filter]}
            <span className={cn(
              "ml-2 px-2 py-0.5 rounded-full text-xs font-medium",
              isActive 
                ? "bg-primary-foreground/20 text-primary-foreground" 
                : "bg-muted text-muted-foreground"
            )}>
              {count}
            </span>
          </Button>
        );
      })}
    </div>
  );
}