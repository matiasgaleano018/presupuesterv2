import Swal from "sweetalert2";
import BaseLayout from "../../../pages/components/BaseLayout";
import FormMovementFilter from "../components/FormMovementFilter";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import useGetDetailsMovements from "../hooks/useGetDetailsMovements";
import type { DetailsMovementData } from "../types/balance-operation.type";
import DetailMovementTable from "../components/DetailMovementTable";

type FormData = {
  start_date: string;
  end_date: string;
  type_slug: string;
  category_id: string;
};

type Filter = {
  start_date?: string;
  end_date?: string;
  type_slug?: string;
  category_id?: string;
};

type OptionType = {
  value: string | number;
  label: string;
};

function MovementsPage() {
  const [filter, setFilter] = useState<Filter>({
    start_date: dayjs().startOf("day").subtract(7, "day").toISOString(),
    end_date: dayjs().startOf("day").add(1, "day").toISOString(),
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    start_date: dayjs().startOf("day").subtract(7, "day").format("YYYY-MM-DD"),
    end_date: dayjs().startOf("day").format("YYYY-MM-DD"),
    type_slug: "",
    category_id: "",
  });

  const [movements, setMovements] = useState<DetailsMovementData[]>([]);

  useEffect(() => {
    setLoading(true);
    useGetDetailsMovements({ params: filter })
      .then((data) => setMovements(data))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [filter]);
  const handleSelectChange = (
    field: keyof FormData,
    value: OptionType | null
  ) => {
    if (!value) {
      setFormData((prev) => ({
        ...prev,
        [field]: "",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [field]: value.value,
    }));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let filterColumns = {};
    if (!formData.start_date || !formData.end_date) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Las fechas son obligatorias",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    const startDate = dayjs(formData.start_date).startOf("day");
    const endDate = dayjs(formData.end_date).startOf("day").add(1, "day");
    if (startDate.isAfter(endDate)) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "La fecha de inicio debe ser menor a la fecha de fin",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    if (formData.type_slug) {
      filterColumns = {
        ...filterColumns,
        type_slug: formData.type_slug,
      };
    }
    if (formData.category_id) {
      filterColumns = {
        ...filterColumns,
        category_id: formData.category_id,
      };
    }
    if (formData.start_date) {
      filterColumns = {
        ...filterColumns,
        start_date: startDate.format("YYYY-MM-DD HH:mm:ss"),
      };
    }
    if (formData.end_date) {
      filterColumns = {
        ...filterColumns,
        end_date: endDate.format("YYYY-MM-DD HH:mm:ss"),
      };
    }
    setFilter(filterColumns);

    console.log(filterColumns);
  };
  return (
    <>
      <BaseLayout>
        <div className="card border-0">
          <div className="card-header border-0">
            <h3 className="card-title text-white fw-bold text-uppercase">
              Movimientos
            </h3>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <FormMovementFilter
                onChange={handleChange}
                onSubmit={handleSubmit}
                onSelectChange={handleSelectChange}
                formData={formData}
              />
              <div className="card">
                {loading && (
                  <div className="card-body">
                    <div className="d-flex justify-content-center">
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className="card-body p-0"
                  style={{ maxHeight: "500px", overflowY: "auto" }}
                >
                  <DetailMovementTable options={movements} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
}

export default MovementsPage;
