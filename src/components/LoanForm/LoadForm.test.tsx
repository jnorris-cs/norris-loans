import { render } from "@testing-library/react";
import LoanForm from "./LoanForm";
import fields from "../../../public/json/fieldsMetaData.json";
import type { FieldMetadata } from "../../types";

const typedFields = fields as FieldMetadata[];

describe("LoanForm", () => {
	it("renders the component correctly", () => {
		const result = render(<LoanForm fields={typedFields} />);
		expect(result.baseElement).toMatchSnapshot();
	});
});
