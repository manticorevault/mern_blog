import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import { createBlog } from '../../actions/blog';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import { QuillModules, QuillFormats } from "../../helpers/quill"
import '../../node_modules/react-quill/dist/quill.snow.css';

const BlogUpdate = () => {
    return (
        <div className="container-fluid pb-5">
            <div className="row">
                <div className="col-md-8">
                    <p> Blog Form </p>
                    <div className="pt-3">
                        <p>
                            Success and error messages
                        </p>
                    </div>

                </div>

                <div className="col-md-4">
                    <div>
                        <div className="form-group pb-2">
                            <h5>Cover Picture</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogUpdate;