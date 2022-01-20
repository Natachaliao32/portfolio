import portrait from '../assets/utils/portrait.png';
import mailImg from '../assets/utils/mail.png'
import './about.css';

const About = (props) => {
  const { mail } = props;
  return (
    <div className="about">
      <img className="portrait" alt="portrait" src={portrait}></img>
      <div className="about-desc">
        <p>Actuellement en 3ème année d'école d'ingénieurs dans la formation IMAC (Informatique, Multimédia, Audiovisuel et Communication), j'aime le développement web, le design graphique et le motion design. Je cherche un stage en développement web de 4/6 mois à compter du 28 mars.</p>
        <span className="about-mail">
          <img alt="mail" src={mailImg}></img>
          <a href="mailto:natacha-liao@live.fr?subject=Mail depuis portfolio">{mail}</a>
        </span>
      </div>
    </div>
  )
}

export { About };