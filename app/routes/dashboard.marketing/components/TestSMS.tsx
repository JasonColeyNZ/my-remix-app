import { Form, useActionData } from "@remix-run/react";

import type { action } from "../route.tsx";

const TestSMS = () => {
  const actionData = useActionData<typeof action>();

  return (
    <Form method="POST">
      <input type="hidden" name="intent" value="sendSMS" />
      <label>
        Phone Number:
        <input
          name="phoneNumber"
          type="tel"
          defaultValue={actionData?.user.email}
        />
      </label>
      <br />
      <label>
        Message:
        {/* <textarea name="message" defaultValue={actionData?.message} /> */}
      </label>
      <br />
      <button type="submit">Send SMS</button>
    </Form>
  );
};

export default TestSMS;
