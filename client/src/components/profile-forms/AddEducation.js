import React,{Fragment,useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {addEducation} from '../../actions/profile';
import {Link,useNavigate} from 'react-router-dom';

const AddEducation = ({addEducation}) => {
    const navigate = useNavigate();
    const [formData,setFormData]=useState({
        school:'',
        degree:'',
        fieldofstudy:'',
        from:'',
        to:'',
        current:false,
        description:''
    })

    const { school, degree, fieldofstudy, from, to, current, description } = formData;

    const onchange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const onsubmit=(e)=>{
        e.preventDefault();
        addEducation(formData,navigate);
    }

    return (
        <Fragment>
            <form className="form" onSubmit={e=>onsubmit(e)}>
                <div className="form-group">
                <input type="text" placeholder="* School" name="school" value={school} onChange={(e)=>onchange(e)}/>
                </div>
                <div className="form-group">
                <input type="text" placeholder="* Degree" name="degree" value={degree} onChange={(e)=>onchange(e)}/>
                </div>
                <div className="form-group">
                <input type="text" placeholder="Field of Study" value={fieldofstudy} onChange={(e)=>onchange(e)} name="fieldofstudy" />
                </div>
                <div className="form-group">
                <h4>From Date</h4>
                <input type="date" name="from" value={from} onChange={(e)=>onchange(e)} />
                </div>
                <div className="form-group">
                <p><input type="checkbox" name="current" value={current} onChange={(e)=>onchange(e)} /> Current Job</p>
                </div>
                <div className="form-group">
                <h4>To Date</h4>
                <input type="date" name="to" value={to} onChange={(e)=>onchange(e)} />
                </div>
                <div className="form-group">
                <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Degree Description"
                    value={description} onChange={(e)=>onchange(e)} 
                ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
        </form>
        </Fragment>
    )
}

AddEducation.propTypes = {
    addEducation:PropTypes.func.isRequired,
}

export default connect(null,{addEducation})(AddEducation);