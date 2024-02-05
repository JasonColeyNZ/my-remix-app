import type { MarketingProvider } from "./marketing-provider";

export class SendGridProvider implements MarketingProvider {
  integration: any;
  async connect(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async disconnect(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getLists(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  // infoComponent(): JSX.Element {
  //   return (
  //     <>
  //       Connect your Mailchimp account to Easy MedSpa to synchronize contacts
  //       and marketing campaigns. Receive notifications when new contacts are
  //       added to your Mailchimp account.
  //       <div className="pt-2 font-semibold">
  //         Our Mailchimp Integration enables you to:
  //       </div>
  //       <ul className="flex flex-col p-3 gap-2">
  //         <li>Sync contacts between Easy MedSpa and Mailchimp</li>
  //         <li>Sync marketing campaigns between Easy MedSpa and Mailchimp</li>
  //         <li>
  //           Receive notifications when new contacts are added to your Mailchimp
  //           account
  //         </li>
  //       </ul>
  //     </>
  //   );
  // }
  // configComponent(): JSX.Element {
  //   return (
  //     <div className="flex flex-col gap-2">
  //       <div>
  //         Mailchimp uses Audiences (Lists) to contain the list of contacts.
  //         <br />
  //         Easy MedSpa can only work with a single list, please select a list
  //         from below.
  //       </div>
  //       <div className="flex gap-2">
  //         <Select name="">
  //           <SelectTrigger className="w-[180px]">
  //             <SelectValue placeholder="Select a fruit" />
  //           </SelectTrigger>
  //           <SelectContent>
  //             <SelectGroup>
  //               <SelectLabel>Fruits</SelectLabel>
  //               <SelectItem value="apple">Apple</SelectItem>
  //               <SelectItem value="banana">Banana</SelectItem>
  //               <SelectItem value="blueberry">Blueberry</SelectItem>
  //               <SelectItem value="grapes">Grapes</SelectItem>
  //               <SelectItem value="pineapple">Pineapple</SelectItem>
  //             </SelectGroup>
  //           </SelectContent>
  //         </Select>
  //         <Button>Refresh List from Mailchimp</Button>
  //       </div>
  //     </div>
  //   );
  // }
}
