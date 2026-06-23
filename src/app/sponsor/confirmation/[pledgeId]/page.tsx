import ConfirmationClient from './confirmation-client';

export default function ConfirmationPage(props: unknown) {
  const { params } = props as { params: { pledgeId: string } };
  return <ConfirmationClient />;
}
