import AsyncSelect from "react-select/async";
import { useEffect, useState } from "react";
import { supabase } from "../../App";

type OptionType = {
  value: string;
  label: string;
};

type Props = {
  selectedInterests: string[];
  setSelectedInterests: (interests: string[]) => void;
};

function SelectInterests({ selectedInterests, setSelectedInterests }: Props) {
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);

  useEffect(() => {
    const fetchInterestLabels = async () => {
      if (selectedInterests.length === 0) {
        setSelectedOptions([]);
        return;
      }

      const { data, error } = await supabase
        .from("interests")
        .select("interest")
        .in("interest", selectedInterests);

      if (!error && data) {
        const options = data.map((i) => ({
          value: i.interest,
          label: i.interest,
        }));
        setSelectedOptions(options);
      }
    };

    fetchInterestLabels();
  }, [selectedInterests]);

  const loadOptions = async (inputValue: string): Promise<OptionType[]> => {
    const { data, error } = await supabase
      .from("interests")
      .select("interest")
      .ilike("interest", `${inputValue}%`) 
      .limit(20);

    if (error) {
      console.error("Error loading interests:", error);
      return [];
    }

    return data.map((row) => ({
      value: row.interest,
      label: row.interest,
    }));
  };

  const handleChange = (selected: readonly OptionType[] | null): void => {
    const array = Array.isArray(selected) ? selected : [];
    setSelectedOptions(array);
    setSelectedInterests(array.map((opt) => opt.value));
  };

  return (
    <AsyncSelect
      isMulti
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      value={selectedOptions}
      onChange={handleChange}
      placeholder="Search or select interests"
    />
  );
}

export default SelectInterests;
