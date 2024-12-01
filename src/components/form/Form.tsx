import { FieldValues, FormProvider, FormProviderProps } from "react-hook-form";

interface Props<TFieldValues extends FieldValues>
  extends FormProviderProps<TFieldValues> {
  onSubmit: Parameters<FormProviderProps<TFieldValues>["handleSubmit"]>[0];
}

export const Form = <TFieldValues extends FieldValues = FieldValues>({
  onSubmit,
  children,
  ...props
}: Props<TFieldValues>) => {
  return (
    <FormProvider {...props}>
      <form onSubmit={props.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};
