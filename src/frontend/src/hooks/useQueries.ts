import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useVerifyPasskey() {
  const { actor } = useActor();
  return useMutation<boolean, Error, string>({
    mutationFn: async (passkey: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.verifyPasskey(passkey);
    },
  });
}

export function useCreateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<void, Error, { passkey: string; product: Product }>({
    mutationFn: async ({ passkey, product }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createProduct(passkey, product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<void, Error, { passkey: string; product: Product }>({
    mutationFn: async ({ passkey, product }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateProduct(passkey, product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<void, Error, { passkey: string; productId: string }>({
    mutationFn: async ({ passkey, productId }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteProduct(passkey, productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
