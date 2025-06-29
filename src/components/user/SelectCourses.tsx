import AsyncSelect from "react-select/async";
import { useEffect, useState } from "react";
import { supabase } from "../../App";

type OptionType = {
  value: string;
  label: string;
};

type Props = {
  selectedCourseCodes: string[];
  setSelectedCourseCodes: (codes: string[]) => void;
};

function SelectCourses({ selectedCourseCodes, setSelectedCourseCodes }: Props) {
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);

  useEffect(() => {
    const fetchCourseLabels = async () => {
      if (selectedCourseCodes.length === 0) {
        setSelectedOptions([]);
        return;
      }

      const { data, error } = await supabase
        .from("courses")
        .select("course_code, name")
        .in("course_code", selectedCourseCodes);

      if (!error && data) {
        const options = data.map((course) => ({
          value: course.course_code,
          label: `${course.course_code} — ${course.name}`,
        }));
        setSelectedOptions(options);
      }
    };

    fetchCourseLabels();
  }, [selectedCourseCodes]);

  const loadOptions = async (inputValue: string): Promise<OptionType[]> => {
    let query = supabase.from("courses").select("course_code, name").limit(20);

    if (inputValue.trim()) {
      query = query.or(
        `name.ilike.%${inputValue}%,course_code.ilike.%${inputValue}%`
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching courses:", error);
      return [];
    }

    return data.map((course) => ({
      value: course.course_code,
      label: `${course.course_code} — ${course.name}`,
    }));
  };

  const handleChange = (selected: readonly OptionType[] | null): void => {
    const selectedArray = Array.isArray(selected) ? selected : [];
    setSelectedOptions(selectedArray);
    setSelectedCourseCodes(selectedArray.map((opt) => opt.value));
  };

  return (
    <AsyncSelect
      isMulti
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      value={selectedOptions}
      onChange={handleChange}
      placeholder="Search for your course"
    />
  );
}

export default SelectCourses;
