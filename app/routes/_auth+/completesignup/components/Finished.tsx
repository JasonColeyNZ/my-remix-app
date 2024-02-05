interface FinishStepProps {
  visible: boolean;
  nextClick: boolean;
  setNextClick: React.Dispatch<React.SetStateAction<boolean>>;
  nextStep: () => void;
}

const Finished = ({ visible, nextClick, setNextClick }: FinishStepProps) => {
  if (!visible) return null;
  return (
    <div className="pb-8 text-foreground">
      Congratulations, click finish below to navigate to your Easy MedSpa
      dashboard
    </div>
  );
};

export default Finished;
