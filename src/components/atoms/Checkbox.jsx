import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Checkbox = forwardRef(({ 
  className,
  checked,
  onChange,
  ...props 
}, ref) => {
  return (
    <input
      type="checkbox"
      className={cn(
        "task-checkbox",
        className
      )}
      checked={checked}
      onChange={onChange}
      ref={ref}
      {...props}
    />
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;