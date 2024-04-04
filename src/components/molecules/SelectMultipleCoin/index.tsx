import React, { memo, useState } from "react";
import { Listbox } from "@headlessui/react";
import { Coin } from "@/types/components";

interface MultipleSelectProps {
  options: Coin[];
  setSelectedOptions: (selected: Coin[]) => void;
  selectedOptions: Coin[];
  placeholder?: string;
}

export const MultipleSelectCoin: React.FC<MultipleSelectProps> = memo(
  ({ options, setSelectedOptions, selectedOptions, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelectionChange = (newSelected: Coin[]) => {
      let updatedSelectedOptions: Coin[];

      if (Array.isArray(newSelected)) {
        updatedSelectedOptions = newSelected.slice(0, 2);
      } else {
        updatedSelectedOptions = [newSelected];
      }

      setSelectedOptions(updatedSelectedOptions);
    };

    const handleButtonClick = () => {
      setIsOpen(!isOpen);
    };

    return (
      <Listbox
        multiple
        value={selectedOptions}
        onChange={handleSelectionChange}
      >
        {/* {({ open }) => ( */}
        <>
          <div className="relative">
            <Listbox.Button
              className="flex gap-2 w-full bg-transparent border text-white border-soft/20 rounded-lg p-4 text-left focus:outline-none"
              onClick={handleButtonClick}
            >
              {selectedOptions.length === 0 ? (
                <span className="text-soft">{placeholder}</span>
              ) : (
                selectedOptions.map((option, i) => (
                  <picture className="flex gap-2" key={option.uuid}>
                    <img
                      src={option.iconUrl}
                      alt={option.name}
                      className="w-6 h-6"
                    />
                    {option.name} {selectedOptions.length - 1 !== i && ", "}
                  </picture>
                ))
              )}
            </Listbox.Button>
            {isOpen && (
              <div>
                <>
                  <div className="absolute z-10 mt-2 w-full bg-dark border border-soft/20 rounded-lg shadow-lg">
                    <Listbox.Options
                      static
                      className="p-3 h-80 overflow-y-scroll focus:outline-none"
                    >
                      {options.map((option) => (
                        <Listbox.Option
                          key={option.uuid}
                          value={option}
                          className={({ active }) =>
                            `${
                              active ? "text-white bg-soft/20" : "text-gray-100"
                            }
                            ${
                              selectedOptions.length >= 2
                                ? "cursor-auto"
                                : "cursor-pointer"
                            }
                         rounded-lg select-none relative py-3 px-2`
                          }
                        >
                          {({ selected, active }) => (
                            <div className="flex items-center gap-2">
                              <img
                                src={option.iconUrl}
                                className="w-6 h-6"
                                alt=""
                              />
                              <span
                                className={`${
                                  selected
                                    ? "font-semibold"
                                    : "font-normal text-soft"
                                } block truncate`}
                              >
                                {option.name}
                              </span>
                              {selected ? (
                                <span
                                  className={`${
                                    active ? "text-green" : "text-green"
                                  }
                              absolute inset-y-0 right-0 flex items-center pr-1.5`}
                                >
                                  <svg
                                    width={16}
                                    height={16}
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <circle
                                      cx={8}
                                      cy={8}
                                      r={8}
                                      fill="#1DAB87"
                                    />
                                    <path
                                      d="M5.277 8l1.945 1.945 3.889-3.89"
                                      stroke="#fff"
                                      strokeWidth={1.5}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </span>
                              ) : (
                                <span className=" absolute inset-y-0 right-0 flex items-center pr-1.5">
                                  <svg
                                    width={16}
                                    height={16}
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <circle
                                      cx={8}
                                      cy={8}
                                      r={7.5}
                                      stroke="#90A3BF"
                                    />
                                  </svg>
                                </span>
                              )}
                            </div>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                    <div className="p-3">
                      <button
                        disabled={
                          selectedOptions.length <= 0 ||
                          selectedOptions.length < 2
                        }
                        onClick={() => setIsOpen(false)}
                        className="mt-4 relative z-40 p-3 w-full bg-primary disabled:bg-primary/10 rounded-lg"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </>
              </div>
            )}
          </div>
        </>
        {/* )} */}
      </Listbox>
    );
  }
);
