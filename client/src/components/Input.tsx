// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Input({ type, props }: { type: string; props?: any }) {
  return (
    <input
      type={type}
      {...props}
      className="mt-1 text-lg px-3 block w-full rounded-md border border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    />
  );
}

export default Input;
