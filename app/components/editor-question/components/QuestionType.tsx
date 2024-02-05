import type { ComponentPropsWithoutRef, ElementRef } from "react";
import React, { forwardRef, useContext } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../ui/navigation-menu";
import { cn } from "~/utils/shadcn.utils";
import { radioOptions } from "../options/radio-options";
import { textOptions } from "../options/text-options";
import { RadioGroup } from "../../ui/radio-group";
import {
  ControlType,
  FieldType,
  type FieldOptionType,
} from "../../draggable-forms-editor/types";
import BaseRadioItem from "../options/components/BaseRadioItem";
import { AppContext } from "~/store/appContext";
import { checkOptions } from "../options/check-options";
import {
  QuestionControlType,
  type CheckType,
  type RadioType,
  type TextType,
} from "../editor-question-types";
import { QuestionStateTypes } from "~/store/questionReducer";

const QuestionType = () => {
  const { state, dispatch } = useContext(AppContext);

  // console.log(state.questionState.fieldDefinition.controlType);

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    option: RadioType | TextType | CheckType,
  ) => {
    e.stopPropagation();
    switch (option.type) {
      case QuestionControlType.radio:
        dispatch({
          type: QuestionStateTypes.fieldType,
          payload: {
            fieldType: FieldType.SELECT,
            controlType: ControlType.RADIO,
          },
        });
        dispatch({
          type: QuestionStateTypes.addOptions,
          payload: {
            addOptions: [
              ...(option.options.map((option, index) => ({
                text: option.text,
                value: option.value,
                textBox: option.textBox,
                index: index,
                sortOrder: option.sortOrder,
                clearOthers: option.clearOthers,
              })) ?? []),
            ],
          },
        });

        // console.log("radio");
        break;
      case QuestionControlType.text:
        dispatch({
          type: QuestionStateTypes.fieldType,
          payload: {
            fieldType: option.fieldType,
            controlType: ControlType.NULL,
          },
        });
        // console.log("text");
        dispatch({
          type: QuestionStateTypes.addOptions,
          payload: {
            addOptions: [],
          },
        });
        break;
      case QuestionControlType.check:
        dispatch({
          type: QuestionStateTypes.fieldType,
          payload: {
            fieldType: FieldType.SELECT,
            controlType: ControlType.CHECKBOX,
          },
        });
        dispatch({
          type: QuestionStateTypes.addOptions,
          payload: {
            addOptions: [
              ...(option.options.map((option, index) => ({
                text: option.text,
                value: option.value,
                textBox: option.textBox,
                index: index,
                sortOrder: option.sortOrder,
                clearOthers: option.clearOthers,
              })) ?? []),
            ],
          },
        });
        // console.log("check");
        break;
    }
  };

  return (
    //tabIndex={-1} is needed to allow the first select to work
    <NavigationMenu tabIndex={-1}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(
              state.questionState.fieldDefinition.controlType ===
                ControlType.RADIO && "bg-primary-6",
            )}
          >
            Radio Group
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className={"grid gap-3 p-4  lg:grid-cols-[.75fr_1fr]"}>
              {radioOptions.map((option) => (
                <ListItem
                  onClick={(e) => {
                    handleClick(e, option);
                  }}
                  key={option.value}
                  title={option.text}
                  className="gap-2 w-72"
                >
                  <RadioGroup className="mt-2" value={"0"}>
                    {option.options.map((option: FieldOptionType) => (
                      <BaseRadioItem
                        key={option.value}
                        option={option}
                        draggableProvided={null}
                      />
                    ))}
                  </RadioGroup>
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(
              state.questionState.fieldDefinition.fieldType ===
                FieldType.TEXTINPUT ||
                (state.questionState.fieldDefinition.fieldType ===
                  FieldType.TEXTAREA &&
                  "bg-primary-6"),
            )}
          >
            Text
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              {textOptions.map((option) => (
                <ListItem
                  onClick={(e) => {
                    handleClick(e, option);
                  }}
                  key={option.value}
                  title={option.text}
                  className="gap-2"
                >
                  {option.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(
              state.questionState.fieldDefinition.controlType ===
                ControlType.CHECKBOX && "bg-primary-6",
            )}
          >
            Check boxes
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              {checkOptions.map((option) => (
                <ListItem
                  onClick={(e) => {
                    handleClick(e, option);
                  }}
                  key={option.value}
                  title={option.text}
                  className="gap-2"
                ></ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = forwardRef<ElementRef<"div">, ComponentPropsWithoutRef<"div">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <div
            // onClick={(e) => {
            //   e.stopPropagation();
            //   console.log("clicked");
            // }}
            ref={ref}
            className={cn(
              "flex flex-col select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors bg-accent text-accent-foreground hover:bg-primary-4 focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="flex-1 text-sm font-medium leading-none ">
              {title}
            </div>
            <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </div>
          </div>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";

export default QuestionType;
