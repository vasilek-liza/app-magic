import { Dropdown as DropDownRsuite } from "rsuite";
import "./Dropdown.scss";

export function Dropdown({items, onSelect, title}) {

    return (
        <DropDownRsuite title={title} className={"dropdown"} >
            {items.map((item) => (
                <DropDownRsuite.Item key={item.id} onSelect={() => onSelect(item)}>
                    {item.name}
                </DropDownRsuite.Item>
            ))}
        </DropDownRsuite>
    );
}