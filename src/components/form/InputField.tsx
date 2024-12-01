import { Input, InputProps } from "@chakra-ui/react";
import {
  FieldPath,
  FieldValues,
  RegisterOptions,
  useController,
  useFormContext,
} from "react-hook-form";
import { Field } from "@/components/ui/field";

interface Props<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends InputProps {
  name: TFieldName;
  label?: React.ReactNode;
  rules?: Omit<
    RegisterOptions<TFieldValues, TFieldName>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}

export const InputField = <TFieldValues extends FieldValues>({
  name,
  rules,
  label,
  ...inputProps
}: Props<TFieldValues>) => {
  const { control } = useFormContext<TFieldValues>();
  const {
    field,
    fieldState: { error },
  } = useController({ control, name, rules });

  return (
    <Field label={label}>
      <Input placeholder="請輸入" {...field} {...inputProps} />
      {error && error.message}
    </Field>
  );
};
