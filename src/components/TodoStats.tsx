import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCheck, Trash2, TrendingUp, Clock, Star } from 'lucide-react';

interface TodoStatsProps {
  activeCount: number;
  completedCount: number;
  totalCount: number;
  highPriorityCount: number;
  onClearCompleted: () => void;
}

export function TodoStats({ 
  activeCount, 
  completedCount, 
  totalCount, 
  highPriorityCount, 
  onClearCompleted 
}: TodoStatsProps) {
  const completionRate = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Карта прогресса*/}
      <div className="p-4 bg-card rounded-lg border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="font-semibold">Прогресс выполнения</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {Math.round(completionRate)}%
          </span>
        </div>
        <Progress value={completionRate} className="h-2 mb-2" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Выполнено: {completedCount}</span>
          <span>Всего: {totalCount}</span>
        </div>
      </div>

      {/* Сетка статистики*/}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3 bg-card rounded-lg border text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Clock className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-muted-foreground">Активные</span>
          </div>
          <div className="text-xl font-bold text-blue-500">{activeCount}</div>
        </div>

        <div className="p-3 bg-card rounded-lg border text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <CheckCheck className="h-4 w-4 text-success" />
            <span className="text-sm text-muted-foreground">Выполнено</span>
          </div>
          <div className="text-xl font-bold text-success">{completedCount}</div>
        </div>

        <div className="p-3 bg-card rounded-lg border text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Star className="h-4 w-4 text-red-500" />
            <span className="text-sm text-muted-foreground">Приоритет</span>
          </div>
          <div className="text-xl font-bold text-red-500">{highPriorityCount}</div>
        </div>

        <div className="p-3 bg-card rounded-lg border text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Всего</span>
          </div>
          <div className="text-xl font-bold text-primary">{totalCount}</div>
        </div>
      </div>

      {/* Очистка */}
      {completedCount > 0 && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={onClearCompleted}
            className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 hover:scale-105"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Очистить выполненные ({completedCount})
          </Button>
        </div>
      )}
    </div>
  );
}