import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import { singleBlog, updateBlog } from '../../actions/blog';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import { QuillModules, QuillFormats } from "../../helpers/quill"
import '../../node_modules/react-quill/dist/quill.snow.css';

const BlogUpdate = ({ router }) => {

    const [body, setBody] = useState("");

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [checkedCategory, setCheckedCategory] = useState([]);
    const [checkedTag, setCheckedTag] = useState([]);

    const [values, setValues] = useState({
        title: '',
        error: '',
        success: '',
        formData: '',
        body: ''
    });

    const { error, success, formData, title } = values;

    useEffect(() => {

        setValues({ ...values, formData: new FormData() });
        initBlog();
        initCategories();
        initTags();
    }, [router]);

    const initBlog = () => {

        if (router.query.slug) {
            singleBlog(router.query.slug).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setValues({ ...values, title: data.title });
                    setBody(data.body);
                    setCategoriesArray(data.categories);
                    setTagsArray(data.tags);
                }
            });
        }
    };

    const setCategoriesArray = blogCategories => {
        let categoriesArray = [];
        blogCategories.map((category, index) => {
            categoriesArray.push(category._id);
        });

        setCheckedCategory(categoriesArray);
    };

    const setTagsArray = blogTags => {
        let tagsArray = [];
        blogTags.map((tag, index) => {
            tagsArray.push(tag._id);
        });

        setCheckedTag(tagsArray);
    };

    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

    const initTags = () => {
        getTags().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setTags(data);
            }
        });
    };


    const handleToggle = category => () => {
        setValues({ ...values, error: '' });

        const clickedCategory = checkedCategory.indexOf(category);
        const all = [...checkedCategory];

        if (clickedCategory === -1) {
            all.push(category);
        } else {
            all.splice(clickedCategory, 1);
        }
        console.log(all);
        setCheckedCategory(all);
        formData.set('categories', all);
    };

    const handleTagsToggle = tag => () => {
        setValues({ ...values, error: '' });

        const clickedTag = checkedTag.indexOf(tag);
        const all = [...checkedTag];

        if (clickedTag === -1) {
            all.push(tag);
        } else {
            all.splice(clickedTag, 1);
        }
        console.log(all);
        setCheckedTag(all);
        formData.set('tags', all);
    };

    const fetchCategories = category => {
        const result = checkedCategory.indexOf(category);
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    };

    const fetchTags = tag => {
        const result = checkedTag.indexOf(tag);
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    };

    const showCategories = () => {
        return (
            categories &&
            categories.map((category, index) => (
                <li key={index} className="list-unstyled">
                    <input
                        onChange={handleToggle(category._id)}
                        checked={fetchCategories(category._id)}
                        type="checkbox"
                        className="mr-2"
                    />
                    <label className="form-check-label">{category.name}</label>
                </li>
            ))
        );
    };

    const showTags = () => {
        return (
            tags &&
            tags.map((tag, index) => (
                <li key={index} className="list-unstyled">
                    <input
                        onChange={handleTagsToggle(tag._id)}
                        checked={fetchTags(tag._id)}
                        type="checkbox"
                        className="mr-2"
                    />
                    <label className="form-check-label">{tag.name}</label>
                </li>
            ))
        );
    };

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
    };

    const handleBody = e => {
        setBody(e);
        formData.set("body", e)
    }

    const editBlog = () => {
        console.log("Atualizar o blog")
    }

    const updateBlogForm = () => {
        return (
            <form onSubmit={editBlog}>
                <div className="form-group">
                    <label className="text-muted">Title</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')} />
                </div>

                <div className="form-group">
                    <ReactQuill
                        modules={QuillModules}
                        formats={QuillFormats}
                        value={body}
                        placeholder="Escreva algo aqui!"
                        onChange={handleBody}
                    />
                </div>

                <div>
                    <button type="submit" className="btn btn-primary">
                        Atualizar
                    </button>
                </div>
            </form>
        );
    };

    return (
        <div className="container-fluid pb-5">
            <div className="row">
                <div className="col-md-8">
                    {updateBlogForm()}
                    <div className="pt-3">
                        <p> Mensagem de Sucesso / Erro </p>
                    </div>

                </div>
                <div className="col-md-4">
                    <div>
                        <div className="form-group pb-2">
                            <h5>Imagem de Capa</h5>
                            <hr />

                            <small className="text-muted">Max size: 5MB</small>
                            <hr></hr>
                            <label className="btn btn-outline-info">
                                Subir Imagem de Capa
                                <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                            </label>
                        </div>
                    </div>
                    <div>
                        <h5>Categorias</h5>
                        <hr />

                        <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showCategories()}</ul>
                    </div>
                    <div>
                        <h5>Tags</h5>
                        <hr />
                        <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showTags()}</ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(BlogUpdate);