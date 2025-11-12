import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ErrorMessageProps {
  title?: string;
  message: string;
}

export const ErrorMessage = ({ 
  title = 'Error', 
  message 
}: ErrorMessageProps) => {
  return (
    <Alert variant="destructive" className="mx-auto max-w-2xl">
      <AlertCircle className="h-5 w-5" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};
