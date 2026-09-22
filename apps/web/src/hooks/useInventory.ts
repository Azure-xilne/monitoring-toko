import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { inventoryService } from '../services/inventory.service';

export const useInventory = () => {
  return useQuery({
    queryKey: ['inventory'],
    queryFn: () => inventoryService.getAll(),
  });
};

export const useInventorySummary = () => {
  return useQuery({
    queryKey: ['inventory', 'summary'],
    queryFn: () => inventoryService.getSummary(),
  });
};

export const useLowStock = () => {
  return useQuery({
    queryKey: ['inventory', 'low-stock'],
    queryFn: () => inventoryService.getLowStock(),
  });
};

export const useRecordMovement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: inventoryService.recordMovement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
    },
  });
};
