import AsyncSelect from "react-select/async";
import { supabase } from "../../App";

type OptionType = {
  value: string;
  label: string;
};

function SelectCourses() {
  const loadOptions = async (inputValue: string): Promise<OptionType[]> => {
    if (!inputValue) return [];

    const { data, error } = await supabase
      .from("courses")
      .select("course_code, name")
      .or(`name.ilike.%${inputValue}%,course_code.ilike.%${inputValue}%`)
      .limit(20);

    if (error) {
      console.error("Error fetching courses:", error);
      return [];
    }

    return (data || []).map((course) => ({
      value: course.course_code,
      label: `${course.course_code} — ${course.name}`,
    }));
  };
  

  return (
    <AsyncSelect
      isMulti
      cacheOptions
      defaultOptions={false}
      loadOptions={loadOptions}
      placeholder="Search for your course"
    />
  );
}

export default SelectCourses;
