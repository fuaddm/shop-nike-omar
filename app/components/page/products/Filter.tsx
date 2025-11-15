import { Check, ChevronDown } from 'lucide-react';
import { parseAsBoolean, parseAsNativeArrayOf, parseAsString, useQueryState } from 'nuqs';
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Disclosure,
  DisclosurePanel,
  Heading,
  Radio,
  RadioGroup,
} from 'react-aria-components';
import { colors } from '~/constants/product-const';

import { cn } from '@libs/cn';

export function Filter() {
  const [priceRangeId, setPriceRangeId] = useQueryState('PriceRangeId');
  const [genderId, setGenderId] = useQueryState('ClothingGenderId', parseAsNativeArrayOf(parseAsString));
  const [colorId, setColorId] = useQueryState('ColorId', parseAsNativeArrayOf(parseAsString));
  const [isOpen, setIsOpen] = useQueryState('VisibilityOfFilter', parseAsBoolean.withDefault(true));

  function setGenderIdWithValue(value: string) {
    setGenderId((previous) => {
      if (previous.includes(value)) {
        return previous.filter((value_: string) => value_ !== value);
      }
      return [...previous, value];
    });
  }
  function setColorIdWithValue(value: string) {
    setColorId((previous) => {
      if (previous.includes(value)) {
        return previous.filter((value_: string) => value_ !== value);
      }
      return [...previous, value];
    });
  }

  return (
    <div
      className={cn({
        'w-[300px] min-w-[300px] transition-all duration-300': true,
        'w-0 min-w-0': !isOpen,
      })}
    >
      <div
        className={cn({
          'bg-surface-container-low h-fit w-[300px] min-w-[300px] rounded-xl px-4 pt-4 pb-10 transition duration-300': true,
          '-translate-x-[150%]': !isOpen,
        })}
      >
        <div className="mb-4 ps-1 text-xl font-bold">Filter</div>
        <div className="flex flex-col gap-2">
          <Disclosure
            defaultExpanded={true}
            className="group"
          >
            <Heading>
              <Button
                slot="trigger"
                className="bg-surface-bright text-on-surface-variant group-data-expanded:text-on-surface hover:bg-surface-dim flex w-full items-center justify-between rounded-lg px-3 py-2 transition-all ease-out group-data-expanded:rounded-b-none"
              >
                Price Range {priceRangeId && '(1)'}
                <ChevronDown
                  className="transition group-data-expanded:-rotate-180"
                  size={18}
                />
              </Button>
            </Heading>
            <DisclosurePanel>
              <RadioGroup
                className="my-2 flex flex-col gap-1.5"
                aria-label="price"
                name="price"
                value={priceRangeId ?? 'null'}
              >
                <Radio
                  className="bg-surface-bright group text-on-surface-variant hover:bg-surface-dim flex items-center gap-2 rounded-md px-2 py-2 text-sm transition ease-out"
                  value="1"
                  onClick={() => {
                    if ('1' === priceRangeId) {
                      setPriceRangeId(null);
                    } else {
                      setPriceRangeId('1');
                    }
                  }}
                >
                  <div className="border-outline group-data-selected:bg-surface-tint group-data-selected:border-surface-tint h-4.5 w-4.5 rounded border p-0.5">
                    <Check className="invisible h-full w-full stroke-white group-data-selected:visible" />
                  </div>
                  $0 - $50
                </Radio>
                <Radio
                  className="bg-surface-bright text-on-surface-variant group hover:bg-surface-dim flex items-center gap-2 rounded-md px-2 py-2 text-sm transition ease-out"
                  value="2"
                  onClick={() => {
                    if ('2' === priceRangeId) {
                      setPriceRangeId(null);
                    } else {
                      setPriceRangeId('2');
                    }
                  }}
                >
                  <div className="border-outline group-data-selected:bg-surface-tint group-data-selected:border-surface-tint h-4.5 w-4.5 rounded border p-0.5">
                    <Check className="invisible h-full w-full stroke-white group-data-selected:visible" />
                  </div>
                  $50 - $100
                </Radio>
                <Radio
                  className="bg-surface-bright text-on-surface-variant group hover:bg-surface-dim flex items-center gap-2 rounded-md px-2 py-2 text-sm transition ease-out"
                  value="3"
                  onClick={() => {
                    if ('3' === priceRangeId) {
                      setPriceRangeId(null);
                    } else {
                      setPriceRangeId('3');
                    }
                  }}
                >
                  <div className="border-outline group-data-selected:bg-surface-tint group-data-selected:border-surface-tint h-4.5 w-4.5 rounded border p-0.5">
                    <Check className="invisible h-full w-full stroke-white group-data-selected:visible" />
                  </div>
                  $100+
                </Radio>
              </RadioGroup>
            </DisclosurePanel>
          </Disclosure>
          <Disclosure
            defaultExpanded={genderId.length > 0}
            className="group"
          >
            <Heading>
              <Button
                slot="trigger"
                className="bg-surface-bright text-on-surface-variant group-data-expanded:text-on-surface hover:bg-surface-dim flex w-full items-center justify-between rounded-lg px-3 py-2 transition-all ease-out group-data-expanded:rounded-b-none"
              >
                Gender {genderId.length > 0 && `(${genderId.length})`}
                <ChevronDown
                  className="transition group-data-expanded:-rotate-180"
                  size={18}
                />
              </Button>
            </Heading>
            <DisclosurePanel>
              <CheckboxGroup
                className="my-2 flex flex-col gap-1.5"
                aria-label="gender"
                name="gender"
                defaultValue={genderId}
              >
                <Checkbox
                  className="bg-surface-bright group text-on-surface-variant hover:bg-surface-dim flex items-center gap-2 rounded-md px-2 py-2 text-sm transition ease-out"
                  value="1"
                  onClick={() => {
                    setGenderIdWithValue('1');
                  }}
                >
                  <div className="border-outline group-data-selected:bg-surface-tint group-data-selected:border-surface-tint h-4.5 w-4.5 rounded border p-0.5">
                    <Check className="invisible h-full w-full stroke-white group-data-selected:visible" />
                  </div>
                  Men
                </Checkbox>
                <Checkbox
                  className="bg-surface-bright group text-on-surface-variant hover:bg-surface-dim flex items-center gap-2 rounded-md px-2 py-2 text-sm transition ease-out"
                  value="2"
                  onClick={() => {
                    setGenderIdWithValue('2');
                  }}
                >
                  <div className="border-outline group-data-selected:bg-surface-tint group-data-selected:border-surface-tint h-4.5 w-4.5 rounded border p-0.5">
                    <Check className="invisible h-full w-full stroke-white group-data-selected:visible" />
                  </div>
                  Women
                </Checkbox>
                <Checkbox
                  className="bg-surface-bright group text-on-surface-variant hover:bg-surface-dim flex items-center gap-2 rounded-md px-2 py-2 text-sm transition ease-out"
                  value="3"
                  onClick={() => {
                    setGenderIdWithValue('3');
                  }}
                >
                  <div className="border-outline group-data-selected:bg-surface-tint group-data-selected:border-surface-tint h-4.5 w-4.5 rounded border p-0.5">
                    <Check className="invisible h-full w-full stroke-white group-data-selected:visible" />
                  </div>
                  Unisex
                </Checkbox>
              </CheckboxGroup>
            </DisclosurePanel>
          </Disclosure>
          <Disclosure
            defaultExpanded={colorId.length > 0}
            className="group"
          >
            <Heading>
              <Button
                slot="trigger"
                className="bg-surface-bright text-on-surface-variant group-data-expanded:text-on-surface hover:bg-surface-dim flex w-full items-center justify-between rounded-lg px-3 py-2 transition-all ease-out group-data-expanded:rounded-b-none"
              >
                Color {colorId.length > 0 && `(${colorId.length})`}
                <ChevronDown
                  className="transition group-data-expanded:-rotate-180"
                  size={18}
                />
              </Button>
            </Heading>
            <DisclosurePanel>
              <CheckboxGroup
                className="mt-4 mb-2 grid grid-cols-4 gap-y-3"
                aria-label="color"
                name="color"
                defaultValue={colorId}
              >
                {colors.map((color) => {
                  return (
                    <Checkbox
                      key={color.id}
                      className="group/color flex cursor-pointer flex-col items-center gap-1"
                      value={String(color.id)}
                      onClick={() => {
                        setColorIdWithValue(String(color.id));
                      }}
                    >
                      <div
                        style={{ backgroundColor: color.code }}
                        className="h-8 w-8 rounded-full p-1.5 transition ease-out group-hover/color:opacity-50"
                      >
                        {colorId.includes(String(color.id)) && <Check className="h-full w-full stroke-white" />}
                      </div>
                      <div className="text-center text-xs transition ease-out group-hover/color:opacity-50">
                        {color.name}
                      </div>
                    </Checkbox>
                  );
                })}
              </CheckboxGroup>
            </DisclosurePanel>
          </Disclosure>
        </div>
      </div>
    </div>
  );
}
