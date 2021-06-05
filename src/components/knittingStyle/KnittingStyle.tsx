import { FunctionComponent } from 'react';
import { KnittingStyle as KnittingStyleEnum } from '../../store/project/project.model';

const options = [
  { id: KnittingStyleEnum.flat, label: 'No' },
  { id: KnittingStyleEnum.inTheRound, label: 'Yes' },
];

interface Props {
  value: KnittingStyleEnum;
  onChange: (value: KnittingStyleEnum) => void;
}

export const KnittingStyle: FunctionComponent<Props> = ({
  value,
  onChange,
}) => {
  return (
    <select
      value={value}
      onChange={(event) =>
        onChange(Number(event.target.value) as KnittingStyleEnum)
      }
    >
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
