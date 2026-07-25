import { useParams } from 'react-router-dom';
import trainersMock from './TrainersMock';

function TrainerDetail() {
  const { id } = useParams();
  const trainer = trainersMock.find((t) => t.TrainerId === id);

  if (!trainer) {
    return <h2>Trainer not found</h2>;
  }

  return (
    <div>
      <h2>Trainers Details</h2>
      <h3>{trainer.Name} ({trainer.Technology})</h3>
      <p>{trainer.Email}</p>
      <p>{trainer.Phone}</p>
      <ul>
        {trainer.Skills.split(',').map((skill) => (
          <li key={skill.trim()}>{skill.trim()}</li>
        ))}
      </ul>
    </div>
  );
}

export default TrainerDetail;
