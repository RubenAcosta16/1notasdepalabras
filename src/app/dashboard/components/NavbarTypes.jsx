import ListTypes from './ListTypes'

const NavbarTypes = ({  userId ,setCurrentType,}) => {
    return <div>
        <ListTypes userId={userId} setCurrentType={setCurrentType}></ListTypes>
    </div>;
}

export default NavbarTypes;